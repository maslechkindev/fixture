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
exports.TokensController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../../../helpers/swagger/decorators");
const errors_1 = require("../../../../../helpers/errors");
const user_decorator_1 = require("../../../../../decorators/user.decorator");
const user_interface_1 = require("../../../../../interfaces/user.interface");
const tokens_service_1 = require("./tokens.service");
const addFcmToken_dto_1 = require("./dto/addFcmToken.dto");
const updateFcmToken_dto_1 = require("./dto/updateFcmToken.dto");
const removeFcmToken_dto_1 = require("./dto/removeFcmToken.dto");
let TokensController = class TokensController {
    constructor(tokensService) {
        this.tokensService = tokensService;
    }
    async add(user, body) {
        await this.tokensService.add(user.id, body.token);
        return { success: true };
    }
    async update(user, body) {
        await this.tokensService.update(user.id, body.newToken, body.oldToken);
        return { success: true };
    }
    async remove(user, body) {
        await this.tokensService.remove(user.id, body.token);
        return { success: true };
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: addFcmToken_dto_1.WrappedAddFcmTokenResponseDto,
        description: 'Add fcm token',
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
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, addFcmToken_dto_1.AddFcmTokenDto]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "add", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: updateFcmToken_dto_1.WrappedUpdateFcmTokenResponseDto,
        description: 'Update fcm token',
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
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateFcmToken_dto_1.UpdateFcmTokenDto]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "update", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: removeFcmToken_dto_1.WrappedRemoveFcmTokenResponseDto,
        description: 'Remove fcm token',
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
    (0, common_1.Delete)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, removeFcmToken_dto_1.RemoveFcmTokenDto]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "remove", null);
TokensController = __decorate([
    (0, decorators_1.ApiBearerAuth)(),
    (0, decorators_1.ApiTags)('FCM tokens'),
    (0, common_1.Controller)('fcm/tokens'),
    __metadata("design:paramtypes", [tokens_service_1.TokensService])
], TokensController);
exports.TokensController = TokensController;
//# sourceMappingURL=tokens.controller.js.map