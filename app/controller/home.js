'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;
    ctx.body = await ctx.model.User.find({}).exec()
  }
}


module.exports = HomeController;
