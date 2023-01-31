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
exports.ChangeUsernameService = void 0;
const config_1 = require("../../../../config");
const common_1 = require("@nestjs/common");
const change_username_repository_1 = require("./change-username.repository");
const user_interface_1 = require("../../../../interfaces/user.interface");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const schedule_1 = require("@nestjs/schedule");
const notifications_service_1 = require("../../../integrations/firebase/messages/notifications/notifications.service");
const types_1 = require("../../../integrations/firebase/messages/notifications/types");
const contest_instance_participants_service_1 = require("../../../contest-instance/contest-instance-participants/contest-instance-participants.service");
const { CRON_SETTINGS } = config_1.default.NOTIFICATIONS.PERSONAL_DETAILS.USERNAME_CHANGE;
let ChangeUsernameService = class ChangeUsernameService {
    constructor(changeUsernameRepository, transactionManager, notificationsService, contestInstanceParticipantService) {
        this.changeUsernameRepository = changeUsernameRepository;
        this.transactionManager = transactionManager;
        this.notificationsService = notificationsService;
        this.contestInstanceParticipantService = contestInstanceParticipantService;
    }
    async isEditable(user) {
        const { confirmedAt, isUsernameChanged } = user;
        if (isUsernameChanged) {
            return false;
        }
        const editableByConfirmationTime = await this.changeUsernameRepository.isEditableByConfirmationTime(confirmedAt);
        return editableByConfirmationTime;
    }
    getUsernameNotEditableDate(user, isUsernameEditable) {
        const { USERNAME_EDITABLE_MINUTES } = config_1.default.EXPIRATIONS.PERSONAL_DETAILS;
        return user.confirmedAt && isUsernameEditable
            ? new Date(user.confirmedAt.getTime() + USERNAME_EDITABLE_MINUTES * 60000)
            : null;
    }
    async change(user, username) {
        const txManager = await this.transactionManager.begin();
        try {
            await this.changeUsernameRepository.change(txManager, user.id, username);
            await txManager.commit();
        }
        catch (err) {
            await txManager.rollback();
            throw err;
        }
        await this.contestInstanceParticipantService.changeUserNameInFireStore(user.id, username);
    }
    async isUsedByOtherUser(user, username) {
        const isUsed = await this.changeUsernameRepository.isUsedByOtherUser(user.id, username);
        return isUsed;
    }
    async notifyUsernameChange() {
        const messages = await this.changeUsernameRepository.getUsersToNotifyAboutChangeUsername();
        await this.notificationsService.sendBatch(messages, types_1.NotificationEnumType.CHANGE_USERNAME_AND_GET_BONUS);
        return;
    }
};
__decorate([
    (0, schedule_1.Cron)(CRON_SETTINGS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChangeUsernameService.prototype, "notifyUsernameChange", null);
ChangeUsernameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [change_username_repository_1.ChangeUsernameRepository,
        transaction_manager_service_1.TransactionManager,
        notifications_service_1.NotificationsService,
        contest_instance_participants_service_1.ContestInstanceParticipantsService])
], ChangeUsernameService);
exports.ChangeUsernameService = ChangeUsernameService;
//# sourceMappingURL=change-username.service.js.map