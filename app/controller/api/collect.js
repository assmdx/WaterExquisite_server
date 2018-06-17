'use strict';

const Controller = require('../core/base_controller');

class CollectController extends Controller {
    let log = this.logger
    async list() {
        const { ctx, service } = this;
        log.info("receive message of collect/list")
        log.debug(ctx.request.body)
        try{
            let data = await service.order.findCollectByUserid(ctx.request.body.userId)
            this.success(data)
        }
        catch(err){
            log.error(err)
            this.fail("fail to get collect list",err)
        }
    }

    async addordelete() {
        const { ctx, service } = this;
        log.info('receive message of collect/addordelete')
        log.debug(ctx.request.body)
        try{
            let data = await service.collect.addordelete(ctx.request.body.goodId,ctx.request.body.userId)
        }
        catch(err){
            log.error(err)
            this.fail("Find collect failed",err)
        }
    }

}

module.exports = OrderController;
