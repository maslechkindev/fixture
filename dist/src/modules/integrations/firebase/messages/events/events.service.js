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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const R = require("ramda");
const firebase_admin_service_1 = require("../../admin/firebase-admin.service");
let EventsService = class EventsService {
    constructor(firebaseAdminService) {
        this.firebaseAdminService = firebaseAdminService;
        this.messaging = this.firebaseAdminService.firebase.messaging();
    }
    async send(event, sendingOptions) {
        const baseMessage = {
            tokens: sendingOptions.fcmTokensToSend,
            data: { messageType: event.messageType },
        };
        const messageToSend = sendingOptions.notStoreEvent
            ? this.getEnrichedMessageWithNotStoreOptions(baseMessage)
            : baseMessage;
        await this.messaging.sendMulticast(messageToSend);
    }
    getEnrichedMessageWithNotStoreOptions(message) {
        const optionsNotToStoreMessage = {
            apns: { headers: { 'apns-expiration': '0' } },
            android: { ttl: 0 },
            webpush: { headers: { TTL: '0' } },
        };
        return R.mergeDeepRight(message, optionsNotToStoreMessage);
    }
};
EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_admin_service_1.FirebaseAdminService])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map