'use strict';

const Controller = require('../core/base_controller');

class OrderController extends Controller {

    async list() {
        const { ctx, service } = this;
        const log = ctx.logger
        log.info("receive message of order/list")
        log.debug(ctx.request.body)
        try{
            let data = await service.order.getAllOrders(ctx.request.body.userId)
            this.success(data)
        }
        catch(err){
            log.error(err)
            this.fail("fail to get order list",err)
        }
    }
}

module.exports = OrderController;
