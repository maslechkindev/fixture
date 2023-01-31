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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const R = require("ramda");
const decorators_1 = require("../../../../../helpers/swagger/decorators");
const errors_1 = require("../../../../../helpers/errors");
const tokens_service_1 = require("../tokens/tokens.service");
const config_1 = require("../../../../../config");
const { NOTIFICATIONS: { TESTING_ENABLED }, } = config_1.default;
const user_decorator_1 = require("../../../../../decorators/user.decorator");
const user_interface_1 = require("../../../../../interfaces/user.interface");
const notifications_service_1 = require("./notifications.service");
const entry_service_1 = require("../../../../user-management/auth/entry/entry.service");
const readNotification_dto_1 = require("./dto/readNotification.dto");
const sendNotification_dto_1 = require("./dto/sendNotification.dto");
let NotificationsController = class NotificationsController {
    constructor(notificationsService, tokensService, entryService) {
        this.notificationsService = notificationsService;
        this.tokensService = tokensService;
        this.entryService = entryService;
    }
    async read(user, body) {
        await this.notificationsService.read(user.id, body.id);
        return { success: true };
    }
    async pushSender(body) {
        if (!TESTING_ENABLED)
            return;
        const { notificationData, username } = body;
        const userDetails = await this.entryService.getUserByUsername(username);
        if (!userDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.NOTIFICATION.USER_NOT_FOUND);
        }
        const tokens = await this.tokensService.getUserTokens(userDetails.id);
        if (R.isEmpty(tokens)) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.NOTIFICATION.USER_NOT_HAVE_NOTIFICATION_TOKENS);
        }
        await this.notificationsService.sendSpecific(notificationData, tokens, userDetails.id, userDetails.notificationsEnabled);
        return { success: true };
    }
};
__decorate([
    (0, decorators_1.ApiBearerAuth)(),
    (0, decorators_1.ApiOkResponse)({
        type: readNotification_dto_1.WrappedReadNotificationResponseDto,
        description: 'Read notification',
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
    (0, common_1.Put)('read'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, readNotification_dto_1.ReadNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "read", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: sendNotification_dto_1.SendNotificationResponseDto,
        description: 'Send notification',
    }),
    (0, decorators_1.ApiBadRequestResponseWithMultipleExceptions)([
        { exceptionBody: errors_1.ERRORS.NOTIFICATION.USER_NOT_FOUND },
        { exceptionBody: errors_1.ERRORS.NOTIFICATION.USER_NOT_HAVE_NOTIFICATION_TOKENS },
    ]),
    (0, common_1.Post)('testing'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sendNotification_dto_1.SendNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "pushSender", null);
NotificationsController = __decorate([
    (0, decorators_1.ApiTags)('Notifications'),
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        tokens_service_1.TokensService,
        entry_service_1.EntryService])
], NotificationsController);
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=notifications.controller.js.map