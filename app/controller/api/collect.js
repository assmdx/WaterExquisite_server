'use strict';

const Controller = require('../core/base_controller');

class CollectController extends Controller {

    async list() {
        const { ctx, service } = this;
        const log = ctx.logger
        log.info("receive message of collect/list")
        log.debug(ctx.request.body)
        try{
            let data = await service.collect.findCollectByUserid(ctx.request.body.userInfo)
            this.success(data)
        }
        catch(err){
            log.error(err)
            this.fail("fail to get collect list",err)
        }
    }

    async addordelete() {
        const { ctx, service } = this;
        const log = ctx.logger
        log.info('receive message of collect/addordelete')
        log.debug(ctx.request.body)
        try{
            let data = await service.collect.addordelete(ctx.request.body.valueId,ctx.request.body.userInfo)
            this.success(data)
        }
        catch(err){
            log.error(err)
            this.fail("Find collect failed",err)
        }
    }

}

module.exports = CollectController;
