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

    async verify() {
        const {
            ctx,
            service
        } = this;
        const log = ctx.logger;
        const token = ctx.get("X-WaterExquisite-Token");
        if (await service.user.verify(token)) {
            this.success()
        }
        else {
            this.verifyFailed()
        }
    }
}
module.exports = UserController;
