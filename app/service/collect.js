const Service = require('egg').Service;

class CollectService extends Service {



    async findCollectByUserid(userId) {
        const data = await this.ctx.model.Collect.find({
            "user": userId
        }).exec()
        return data
    }


    async findCollectByGoodidUserid(goodId, userId) {
        const data = await this.ctx.model.Collect.find({
            "user": userId,
            "good": goodId
        }).exec()
        return data
    }

    async insertCollect(data) {
        const {
            ctx,
            service
        } = this;        
        const collectModel = new this.ctx.model.Collect(data)
        let dataRes = await collectModel.save().then()
        return dataRes
    }

    async removeCollect(goodId, userId) {
        let data = await this.ctx.model.Collect.remove({
            "good": goodId,
            "user": userId
        }).exec()
        return data
    }

    async addordelete(goodId, userId) {
        const {
            ctx,
            service
        } = this;
        const log = ctx.logger
        let data = await this.findCollectByGoodidUserid(goodId, userId)
        const {
            ObjectId
        } = this.app.mongoose.Types;

        let that = this
        log.debug('here is collect find result :', data)
        if (JSON.stringify(data) === '[]') {

            let findGoodResult = await service.good.getGoodDetail(goodId)
            // log.debug('goodId  is :', goodId)
            // log.debug('findGoodResult  is :', findGoodResult)

            await that.insertCollect({
                user: userId,
                good: ObjectId(goodId),
                list_pic_url: 'http://zheli.org/data/20180516141005.jpg',
                name: findGoodResult[0].info.name,
                goods_brief: '???',
                retail_price: findGoodResult[0].info.goods_retail_price
            })
            return {
                type: 'add'
            }
        } else {
            await that.removeCollect(goodId, userId)
            return {
                type: 'delete'
            }
        }
    }
}

module.exports = CollectService;
