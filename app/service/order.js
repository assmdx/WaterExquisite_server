const Service = require('egg').Service;

class OrderService extends Service {
    async getAllOrders(userId) {

        const data = await this.ctx.model.Order.find({
            "user": userId
        }).exec()
        return data
    }
}

module.exports = OrderService;
