'use strict';
const path = require('path');
module.exports = appInfo => {
    return {
        keys:'R5$Gfi6gxGU$735ROpYMOTu&VJFy^IEaobmdhx4hXN^Yw7vJK8C5Htt5m6Wo5Be79CaTzf1^8XduThQWr!!09B#zGcwHmgC049S',
        logger:{
            dir:path.join(appInfo.root, 'logs'),
        },
        config:{
            keys:appInfo.name + '_MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDV9DYUpEdsEaXIAx0Mt/38at1b',
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
            ignore:'/WaterExquisite_api/auth/loginByWeixin'
        }
    }
};
