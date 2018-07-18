const crypto = require('crypto')
const axios = require('axios')
const jsonwebtoken = require('jsonwebtoken')

const Service = require('egg').Service;

class UserService extends Service {
    async login() {
        const {
            ctx,
            service
        } = this;

        const weixinConfig = this.config.weixin

        //解析用户userInfo和code
        const code = ctx.request.body.code
        const fullUserInfo = ctx.request.body.userInfo
        const userInfo = fullUserInfo.userInfo

        //获取用户的openid
        const options = {
            method: 'GET',
            url: weixinConfig.userauth_url,
            qs: {
                grant_type: 'authorization_code',
                js_code: code,
                secret: weixinConfig.secret,
                appid: weixinConfig.appid
            }
        }
        let openidData = await axios.get(options.url, {
            params: {
                grant_type: 'authorization_code',
                js_code: code,
                secret: weixinConfig.secret,
                appid: weixinConfig.appid
            }
        })

        if (!openidData.data.openid) {
            throw 'login failed at get openid'
        }

        // 验证用户信息完整性 ??????
        const sha1 = crypto.createHash('sha1').update(fullUserInfo.rawData + openidData.data.session_key).digest('hex');
        if (fullUserInfo.signature !== sha1) {
            throw 'login faild at crypto user data'
        }

        //解析用户数据
        const weixinUserInfo = await this.decryptUserInfoData(openidData.data.session_key, fullUserInfo.encryptedData, fullUserInfo.iv)
        if (!weixinUserInfo) {
            throw '登录失败'
        }

        // 根据openid查找用户是否已经注册
        let userid = await this.ctx.model.User.find({
            "userId": openidData.data.openid
        }).exec()
        if (userid.length === 0) {
            const newUser = new this.ctx.model.User({
                userId: openidData.data.openid,
                phoneNum: '',
                address: '',

                openid: openidData.data.openid,
                last_login_time: parseInt(new Date().getTime() / 1000),
                last_login_ip: '',

                avatarUrl: userInfo.avatarUrl || '',
                gender: userInfo.gender || 1,
                nickName: userInfo.nickName,
            })
            await newUser.save().then()
        }

        userid = openidData.data.user_id

        // 查询用户信息
        // const newUserInfo = await this.ctx.model.User.field(['userId', 'nickname', 'gender', 'avatar']).where({
        //   userId: userid
        // }).find();

        // const  newUserInfo = await this.ctx.model.User.find({userId:userid}).exec();
        // newUserInfo.last_login_time = parseInt(new Date().getTime() / 1000);

        // 更新登录信息
        let userInfoUpdated = await this.ctx.model.User.update({userId: userid}, {
            last_login_time: parseInt(new Date().getTime() / 1000)
        })

        const secret = weixinConfig.tokensecret
        const sessionKey = jsonwebtoken.sign(userInfoUpdated, secret)
        if (!userInfoUpdated || !sessionKey) {
            throw "login failed when get session and userInfoUpdate"
        }

        return {
            token: sessionKey,
            userInfo: userInfoUpdated
        }
    }

    /**
     * 解析微信登录用户数据
     * @param sessionKey
     * @param encryptedData
     * @param iv
     * @returns {Promise.<string>}
     */
    async decryptUserInfoData(sessionKey, encryptedData, iv) {

        const weixinConfig = this.config.weixin

        // base64 decode
        const _sessionKey = Buffer.from(sessionKey, 'base64');
        encryptedData = Buffer.from(encryptedData, 'base64');
        iv = Buffer.from(iv, 'base64');
        let decoded = '';
        try {
            // 解密
            const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv);
            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true);
            decoded = decipher.update(encryptedData, 'binary', 'utf8');
            decoded += decipher.final('utf8');

            decoded = JSON.parse(decoded);
        } catch (err) {
            return '';
        }

        if (decoded.watermark.appid !== weixinConfig.appid) {
            return '';
        }

        return decoded;
    }
}

module.exports = UserService;
