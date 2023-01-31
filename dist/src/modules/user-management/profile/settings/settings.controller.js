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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../../helpers/swagger/decorators");
const settings_service_1 = require("./settings.service");
const errors_1 = require("../../../../helpers/errors");
const updateNotificationSettings_dto_1 = require("./dto/updateNotificationSettings.dto");
const user_interface_1 = require("../../../../interfaces/user.interface");
const user_decorator_1 = require("../../../../decorators/user.decorator");
const deactivateAccount_dto_1 = require("./dto/deactivateAccount.dto");
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async updateNotifications(user, updateNotificationsDto) {
        const { enabled } = updateNotificationsDto;
        await this.settingsService.updateNotifications(user.id, enabled);
        return { success: true };
    }
    async deactivateAccount(user) {
        await this.settingsService.deactivateAccount(user.id, user.email);
        return { success: true };
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: updateNotificationSettings_dto_1.WrappedUpdateNotificationsResponse,
        description: 'Updated notification settings',
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
    (0, common_1.Put)('/notifications'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateNotificationSettings_dto_1.UpdateNotificationsDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updateNotifications", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: deactivateAccount_dto_1.WrappedDeactivateAccountResponseDto,
        description: 'Success',
    }),
    (0, common_1.Delete)('/deactivate'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "deactivateAccount", null);
SettingsController = __decorate([
    (0, decorators_1.ApiBearerAuth)(),
    (0, decorators_1.ApiTags)('Profile settings'),
    (0, common_1.Controller)('profile/settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map