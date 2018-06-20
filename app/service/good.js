const Service = require('egg').Service;

class GoodService extends Service {
  async getAllGoods() {
      const data = await this.ctx.model.Good.find({}).exec()
      return data
  }

  async getGoodDetail(goodId) {
      const data = await this.ctx.model.Good.find({"_id":goodId}).exec()
      return data
  }
}

module.exports = GoodService;
