'use strict';

const Controller = require('../core/base_controller');

class UserController extends Controller {

    async login() {
        const {
            ctx,
            service
        } = this;
        const log = ctx.logger;
        try {
            let loginRes = await service.user.login();
            this.success(loginRes)
        } catch (err) {
            log.error(err);
            this.fail("login failed",err);
        }
    }
}
module.exports = UserController;
