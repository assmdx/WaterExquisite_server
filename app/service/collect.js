const Service = require('egg').Service;

class CollectService extends Service {
  async findCollectByUserid(userId) {
      const data = await ctx.model.Collect.find({"user":userId}).exec()
      return data
  }


  async findCollectByGoodidUserid(goodId,userId) {
      const data = await ctx.model.Collect.find({"user":userId,"good":goodId}).exec()
      return data
  }

  async insertCollect(data){
        let data = await ctx.model.Collect.create(data).exec()
        return data
  }

  async removeCollect(goodId,userId){
        let data = await ctx.model.Collect.remove({"good":goodId,"user":userId}).exec()
        return data
  }

  async addordelete(goodId,userId){
      const { ctx, service } = this;
      let data = this.findCollectByGoodidUserid(goodId,userId)
      if(JSON.stringify(data) === '[]'){
          let findGoodResult = await service.good.getGoodDetail(goodId)
          let insertCRes = await this.insertCollect({
              user:ObjectId(userId),
              good:ObjectId(goodId),
              list_pic_url:'http://zheli.org/data/20180516141005.jpg',
              name:findGoodResult[0].info.name,
              goods_brief:'???',
              retail_price:findGoodResult[0].info.goods_retail_price
          })
          return {type:'add'}
      }
      else{
          let data = await this.removeCollect(goodId,userId)
          return {type:'delete'}
      }
  }
}

module.exports = CollectService;
