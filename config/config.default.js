'use strict';
const path = require('path');
module.exports = appInfo => {
    return {
        keys:'',
        logger:{
            dir:path.join(appInfo.root, 'logs'),
        },
        config:{
            keys:appInfo.name + '',
            middleware:[]
        },
        bodyParser:{
          jsonLimit: '100mb'
        },
        mongoose:{
            url:'mongodb://localhost:27017/WaterExquisite',
            options:{},
        },
        logrotator: {
            filesRotateByHour: [
                path.join(appInfo.root, 'logs', appInfo.name, 'common-error.log'),
            ],
        },
        onerror:{
            all(err,ctx){
                ctx.body = {
                    errno:1,
                    errMes:'',
                    data:err
                }
                ctx.status = 500
            }
        },
        middleware:['verifyToken'],
        weixin:{
          appid:'',// 小程序 appid
          secret:'',// 小程序密钥
          mch_id:'',// 商户帐号ID
          partner_key:'',// 微信支付密钥
          notify_url:'',// 微信异步通知
          userauth_url:'https://api.weixin.qq.com/sns/jscode2session',//用于获取微信用用户登录open_id
          tokensecret:''
        },
        verifyToken:{
            ignore(ctx){
                const regOfWeixinLogin = /\/WaterExquisite_api\/auth\/loginByWeixin/;
                const adminApi = /WaterExquisite_manage\/admin\/[.]?/;
                return regOfWeixinLogin.test(ctx.request.url) || adminApi.test(ctx.request.url) ;
            }
        }
    }
};
