'use strict';

const Controller = require('../core/base_controller');

class GoodController extends Controller {
    async index() {
        const {
            ctx,
            service
        } = this;
        const log = ctx.logger
        try {
            let goods = await service.good.getAllGoods()
            let data = {
                floorGoods: [{
                    name: '商品',
                    id: 'index_goods'
                }],
                banner: [{
                    id: 1,
                    imgUrl: 'http://zheli.org/data/20180516141005.jpg'
                },
                    {
                        id: 1,
                        imgUrl: 'http://zheli.org/data/20180516141038.jpg'
                    },
                    {
                        id: 1,
                        imgUrl: 'http://zheli.org/data/20180516141048.jpg'
                    }
                ],
                goodList: goods
            }
            this.success(data)
        } catch (err) {
            log.error(err)
            this.fail("fail to get all goods", err)
        }
    }
    async delete(){
        const {
            ctx,
            service
        }=this;
        const log = ctx.logger;
        log.info('receive message of good/delete');
        try{
            await service.good.removeGood(ctx.request.body.id);
        } catch(err){
            this.fail('fail to delete good',err);
        }
    }
    async add() {
        const {
            ctx,
            service
        } = this;
        const log = ctx.logger
        log.info('receive message of goods/add')
        try {
            await service.good.insertGood(ctx.request.body)
            this.success('insert good success')
        } catch (err) {
            this.fail("fail to add good", err)
        }
    }
}

module.exports = GoodController;