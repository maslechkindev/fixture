"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordController = void 0;
const common_1 = require("@nestjs/common");
const change_password_service_1 = require("./change-password.service");
const user_interface_1 = require("../../../../interfaces/user.interface");
const change_password_dto_1 = require("./dto/change-password.dto");
const user_decorator_1 = require("../../../../decorators/user.decorator");
const errors_1 = require("../../../../helpers/errors");
const decorators_1 = require("../../../../helpers/swagger/decorators");
let ChangePasswordController = class ChangePasswordController {
    constructor(changePasswordService) {
        this.changePasswordService = changePasswordService;
    }
    async changePassword(changePasswordData, user) {
        if (changePasswordData.current === changePasswordData.new) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CHANGE_PASSWORD.PASSWORD_MATCHES);
        }
        const isValidPassword = await this.changePasswordService.checkPassword(user, changePasswordData.current);
        if (!isValidPassword) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CHANGE_PASSWORD.INCORRECT_PASSWORD);
        }
        const customToken = await this.changePasswordService.changePassword(user.id, changePasswordData.new, changePasswordData.initiatorFcmToken);
        return { success: true, customToken };
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: change_password_dto_1.WrappedChangePasswordResponse,
        description: 'Change password',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PASSWORD_INVALID).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CHANGE_PASSWORD.PASSWORD_MATCHES).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CHANGE_PASSWORD.INCORRECT_PASSWORD).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CHANGE_PASSWORD.USER_PREVIOUS_PASSWORD).getResponse(),
                },
            ],
        },
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], ChangePasswordController.prototype, "changePassword", null);
ChangePasswordController = __decorate([
    (0, decorators_1.ApiBearerAuth)(),
    (0, decorators_1.ApiTags)('ChangePassword'),
    (0, common_1.Controller)('profile/password'),
    __metadata("design:paramtypes", [change_password_service_1.ChangePasswordService])
], ChangePasswordController);
exports.ChangePasswordController = ChangePasswordController;
//# sourceMappingURL=change-password.controller.js.map