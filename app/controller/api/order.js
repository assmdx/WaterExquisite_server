'use strict';
const jsonwebtoken = require('jsonwebtoken');
const Controller = require('../core/base_controller');

class OrderController extends Controller {

    async list() {
        const { ctx, service } = this;
        const log = ctx.logger
        log.info("receive message of order/list")
        log.debug(ctx.request.body)
        try{
            const token = ctx.get("X-WaterExquisite-Token");
            const secret = ctx.app.config.weixin.tokensecret;
            const parseRes = jsonwebtoken.verify(token,secret);
            let data = await service.order.getAllOrders(parseRes.openid)
            this.success(data)
        }
        catch(err){
            log.error(err)
            this.fail("fail to get order list",err)
        }
    }
}

module.exports = OrderController;
