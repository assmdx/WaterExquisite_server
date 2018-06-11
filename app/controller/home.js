'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = await ctx.model.User.find({})
  }
}

module.exports = HomeController;
