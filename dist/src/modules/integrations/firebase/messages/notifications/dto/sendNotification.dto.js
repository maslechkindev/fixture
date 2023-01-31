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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendNotificationResponseDto = exports.SendNotificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("../../../../../../config");
const { GOOGLE_STORAGE_URL_PREFIX } = config_1.default;
const notificationDataExample = {
    notification: {
        title: 'CHANGE USERNAME AND GET BONUS',
        body: 'Create your own Username until ${messages.beforeDate} and receive ${messages.reward} tokens. You may only change your Username one time.',
    },
    data: {
        link: '/account/preview',
        buttonName: 'Change username',
        messageType: 'MessageType.CHANGE_USERNAME_AND_GET_BONUS',
        eventType: 'EventType.NOTIFICATION',
        imageLogo: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/logo.png`,
        iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/System_circle_grey.png`,
        iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/System_circle_white.png`,
        imageBanner: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/System_circle_white.png`,
    },
    webpush: {
        fcmOptions: {
            link: '/account/preview',
        },
    },
};
class SendNotificationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'netman' }),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: notificationDataExample }),
    __metadata("design:type", Object)
], SendNotificationDto.prototype, "notificationData", void 0);
exports.SendNotificationDto = SendNotificationDto;
class SendNotificationResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], SendNotificationResponseDto.prototype, "success", void 0);
exports.SendNotificationResponseDto = SendNotificationResponseDto;
//# sourceMappingURL=sendNotification.dto.js.map