"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestInstanceParticipantsModule = void 0;
const common_1 = require("@nestjs/common");
const contest_instance_participants_repository_1 = require("./contest-instance-participants.repository");
const contest_instance_participants_service_1 = require("./contest-instance-participants.service");
const tokens_module_1 = require("../../integrations/firebase/messages/tokens/tokens.module");
const notifications_service_1 = require("../../integrations/firebase/messages/notifications/notifications.service");
let ContestInstanceParticipantsModule = class ContestInstanceParticipantsModule {
};
ContestInstanceParticipantsModule = __decorate([
    (0, common_1.Module)({
        imports: [tokens_module_1.TokensModule],
        providers: [
            contest_instance_participants_service_1.ContestInstanceParticipantsService,
            contest_instance_participants_repository_1.ContestInstanceParticipantsRepository,
            notifications_service_1.NotificationsService,
        ],
        exports: [contest_instance_participants_service_1.ContestInstanceParticipantsService, notifications_service_1.NotificationsService],
    })
], ContestInstanceParticipantsModule);
exports.ContestInstanceParticipantsModule = ContestInstanceParticipantsModule;
//# sourceMappingURL=contest-instance-participants.module.js.map