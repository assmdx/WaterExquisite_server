'use strict';

const Controller = require('../core/base_controller');

class OrderController extends Controller {
    let log = this.logger
    async list() {
        const { ctx, service } = this;
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
