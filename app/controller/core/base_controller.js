const {
  Controller
} = require('egg');
class BaseController extends Controller {
  // get user() {
  //   return this.ctx.session.user;
  // }

  success(data) {
    this.ctx.body = {
      errno: 0,
      errMes: "susscess",
      data,
    };
  }

  fail(msg, data) {
    this.ctx.body = {
      errno: 1,
      errMes: msg,
      data
    }
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;