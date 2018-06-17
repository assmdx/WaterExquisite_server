'use strict';

const Controller = require('../core/base_controller');

class GoodController extends Controller {
    let log = this.logger


    async index() {
        const { ctx, service } = this;
        try{
            let goods = await ctx.service.good.findAllGoods()
            let data = {
                floorGoods: [{name : '商品',id:'index_goods'}],
                banner:[{
                        id:1,imgUrl:'http://zheli.org/data/20180516141005.jpg'
                    },
                    {
                        id:1,imgUrl:'http://zheli.org/data/20180516141038.jpg'
                    },
                    {
                        id:1,imgUrl:'http://zheli.org/data/20180516141048.jpg'
                    }],
                goodList:goods
            }
            this.success(data)
        }
        catch(err){
            log.error(err)
            this.fail("fail to get all goods",err)
        }
    }

    async detail() {
        const { ctx, service } = this;
        log.info('receive message of goods/detail')
        try{
            let goodDetail = await ctx.service.good.findGoodDetail(ctx.request.body.id)
            this.success(data)
        }catch(err){
            log.error(err)
            this.fail("fail to get good detail",err)
        }
    }
    
}


module.exports = GoodController;
