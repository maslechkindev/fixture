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
var ContestPubsubController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestPubsubController = void 0;
const common_1 = require("@nestjs/common");
const pubsub_controller_decorator_1 = require("../integrations/gcp-pubsub/decorators/pubsub-controller.decorator");
const pubsub_handler_decorator_1 = require("../integrations/gcp-pubsub/decorators/pubsub-handler.decorator");
const action_type_1 = require("../integrations/gcp-pubsub/enums/action-type");
const entity_type_1 = require("../integrations/gcp-pubsub/enums/entity-type");
const subscription_1 = require("../integrations/gcp-pubsub/enums/subscription");
const pubsub_message_interface_1 = require("../integrations/gcp-pubsub/interfaces/pubsub-message.interface");
const contest_service_1 = require("./contest.service");
let ContestPubsubController = ContestPubsubController_1 = class ContestPubsubController {
    constructor(contestService) {
        this.contestService = contestService;
        this.logger = new common_1.Logger(ContestPubsubController_1.name);
    }
    async onChangeFixtureCurrentPeriod(message) {
        if (!message.body.fixtureId) {
            this.logger.error(`onChangeFixtureCurrentPeriod: no fixtureId`);
            return;
        }
        await this.contestService.onChangeCurrentPeriodHandler(message.body.fixtureId);
    }
    async onFixtureComplete(message) {
        if (!message.body.fixtureId) {
            this.logger.error(`onFixtureComplete: no fixtureId`);
            return;
        }
        this.logger.debug(`onFixtureComplete: start`);
        await this.contestService.onCompleteHandler(message.body.fixtureId);
        this.logger.debug(`onFixtureComplete: finish`);
    }
    async onContestTemplateChange(message) {
        if (!message.body.id) {
            this.logger.error(`onContestTemplateChange: no id`);
            return;
        }
        await this.contestService.onContestTemplateChange(message.body.id);
    }
};
__decorate([
    (0, pubsub_handler_decorator_1.PubsubHandler)({
        subscription: subscription_1.SUBSCRIPTION.CONSUMER,
        filters: {
            entityType: entity_type_1.ENTITY_TYPE.FIXTURE,
            actionType: action_type_1.ACTION_TYPE.CURRENT_PERIOD_UPDATED,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContestPubsubController.prototype, "onChangeFixtureCurrentPeriod", null);
__decorate([
    (0, pubsub_handler_decorator_1.PubsubHandler)({
        subscription: subscription_1.SUBSCRIPTION.CONSUMER,
        filters: {
            entityType: entity_type_1.ENTITY_TYPE.FIXTURE,
            actionType: action_type_1.ACTION_TYPE.COMPLETED,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContestPubsubController.prototype, "onFixtureComplete", null);
__decorate([
    (0, pubsub_handler_decorator_1.PubsubHandler)({
        subscription: subscription_1.SUBSCRIPTION.CMS,
        filters: {
            actionType: action_type_1.ACTION_TYPE.CONTEST_TEMPLATE_CHANGE,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContestPubsubController.prototype, "onContestTemplateChange", null);
ContestPubsubController = ContestPubsubController_1 = __decorate([
    (0, pubsub_controller_decorator_1.PubsubController)(),
    __metadata("design:paramtypes", [contest_service_1.ContestService])
], ContestPubsubController);
exports.ContestPubsubController = ContestPubsubController;
//# sourceMappingURL=contest.pubsub-controller.js.map