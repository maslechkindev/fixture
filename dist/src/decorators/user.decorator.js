"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
const user_interface_1 = require("../interfaces/user.interface");
const R = require("ramda");
exports.User = (0, common_1.createParamDecorator)((fieldsToPick, ctx) => {
    const response = ctx.switchToHttp().getResponse();
    const { user } = response.locals;
    return fieldsToPick ? R.pick(fieldsToPick, user) : user;
});
//# sourceMappingURL=user.decorator.js.map