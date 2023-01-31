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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../../../../config");
const notifications_map_1 = require("./notifications.map");
const firebase_admin_service_1 = require("../../admin/firebase-admin.service");
const firestore_service_1 = require("../../firestore/firestore.service");
const { ENABLED } = config_1.default.NOTIFICATIONS;
let NotificationsService = class NotificationsService {
    constructor(firestoreService, firebaseAdminService) {
        this.firestoreService = firestoreService;
        this.firebaseAdminService = firebaseAdminService;
        this.messaging = this.firebaseAdminService.firebase.messaging();
    }
    async sendSpecific(notification, tokens, userId, notificationsEnabled) {
        if (!ENABLED)
            return;
        const firestoreMessage = this.enrichNotificationToFirestore(notification);
        const { id: messageId } = await this.firestoreService.add(`/users/${userId}/notifications`, firestoreMessage);
        await this.firestoreService.mergeUpdate(`/users`, userId, {
            activeNotificationsCount: this.firestoreService.increment(),
            totalNotificationsCount: this.firestoreService.increment(),
        });
        if (notificationsEnabled &&
            tokens &&
            Array.isArray(tokens) &&
            tokens.length) {
            const push = this.enrichNotificationToPush(notification, tokens, messageId);
            await this.messaging.sendMulticast(push);
        }
    }
    async sendBatch(messages, notificationName) {
        if (!ENABLED)
            return;
        await Promise.all(messages.map(async ({ tokens, userId, notificationsEnabled, data }) => {
            const notification = notifications_map_1.NOTIFICATIONS[notificationName](data);
            await this.sendSpecific(notification, tokens, userId, notificationsEnabled);
        }));
    }
    async read(userId, messageId) {
        const existedRecord = await this.firestoreService.getDataByDocumentId(`/users/${userId}/notifications`, messageId);
        if (!existedRecord || existedRecord.read)
            return;
        await Promise.all([
            this.firestoreService.mergeUpdate(`/users/${userId}/notifications`, messageId, {
                read: true,
            }),
            this.firestoreService.mergeUpdate(`/users`, userId, {
                activeNotificationsCount: this.firestoreService.decrement(),
            }),
        ]);
    }
    enrichNotificationToFirestore(notification) {
        return Object.assign(Object.assign({}, notification), { createdAt: Date.now(), read: false });
    }
    enrichNotificationToPush(notification, tokens, messageId) {
        const { data } = notification;
        return Object.assign(Object.assign({}, notification), { data: Object.assign(Object.assign({}, data), { messageId }), tokens });
    }
};
NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firestore_service_1.FirestoreService,
        firebase_admin_service_1.FirebaseAdminService])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map