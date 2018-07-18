const jsonwebtoken = require('jsonwebtoken')
module.exports = (options) =>{
    return async function verifyToken(ctx,next)
    {
        const token = ctx.get("X-WaterExquisite-Token");
        const log = ctx.logger;
        const secret = ctx.app.config.weixin.tokensecret;


        try
        {
            if(!token){
                ctx.body = {
                    errno:401,
                    errMes:"session is empty",
                    data:null
                };
            }
            else
            {
                const parseRes = jsonwebtoken.verify(token,secret);
                if(null !== parseRes)
                {
                    await next();
                }
                else{
                    ctx.body = {
                        errno:401,
                        errMes:"session failed",
                        data:null
                    };
                }
            }
        }
        catch(e)
        {
            ctx.body = {
                errno:1,
                errMes:e.message,
                data:null
            };
        }
    }
}