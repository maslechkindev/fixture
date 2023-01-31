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
var ContestInstancePubsubController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestInstancePubsubController = void 0;
const common_1 = require("@nestjs/common");
const pubsub_controller_decorator_1 = require("../integrations/gcp-pubsub/decorators/pubsub-controller.decorator");
const pubsub_handler_decorator_1 = require("../integrations/gcp-pubsub/decorators/pubsub-handler.decorator");
const action_type_1 = require("../integrations/gcp-pubsub/enums/action-type");
const entity_type_1 = require("../integrations/gcp-pubsub/enums/entity-type");
const subscription_1 = require("../integrations/gcp-pubsub/enums/subscription");
const pubsub_message_interface_1 = require("../integrations/gcp-pubsub/interfaces/pubsub-message.interface");
const contest_instance_service_1 = require("./contest-instance.service");
let ContestInstancePubsubController = ContestInstancePubsubController_1 = class ContestInstancePubsubController {
    constructor(contestInstanceService) {
        this.contestInstanceService = contestInstanceService;
        this.logger = new common_1.Logger(ContestInstancePubsubController_1.name);
    }
    async onChangeCurrentPeriodHandler(message) {
        if (!message.body.fixtureId) {
            this.logger.error(`onChangeCurrentPeriodHandler: no fixtureId`);
            return;
        }
        await this.contestInstanceService.runOrCancelInstanceOnChangeCurrentPeriod(message.body.fixtureId);
    }
    async onMarketIsActive(message) {
        if (!message.body.contestId) {
            this.logger.error(`onMarketIsActive: no contestId`);
            return;
        }
        if (!('activePrice' in message.body)) {
            this.logger.error(`onMarketIsActive: no activePrice`);
            return;
        }
        await this.contestInstanceService.tryToRunInstancesOnActiveMarketChange(message.body.contestId, message.body.activePrice);
    }
    async updateContestInstancesOnFixtureCurrentPeriodChange(message) {
        if (!message.body.fixtureId) {
            this.logger.error(`finishContestInstancesOnFixtureChanges: no fixtureId`);
            return;
        }
        await this.contestInstanceService.updateContestInstances(message.body.fixtureId);
        await this.contestInstanceService.finishContestInstancesWhichAreReady(message.body.fixtureId);
        await this.contestInstanceService.cancelContestInstancesOnFixtureStatusChange(message.body.fixtureId);
    }
    async finishContestInstancesOnMarketNotActive(message) {
        if (!message.body.marketId) {
            this.logger.error(`finishContestInstancesOnMarketNotActive: no marketId`);
            return;
        }
        const fixtureId = await this.contestInstanceService.getMarketFixtureId(message.body.marketId);
        await this.contestInstanceService.finishContestInstancesWhichAreReady(fixtureId);
    }
};
__decorate([
    (0, pubsub_handler_decorator_1.PubsubHandler)({
        subscription: subscription_1.SUBSCRIPTION.CONSUMER,
        filters: [
            {
                entityType: entity_type_1.ENTITY_TYPE.FIXTURE,
                actionType: action_type_1.ACTION_TYPE.CURRENT_PERIOD_UPDATED,
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContestInstancePubsubController.prototype, "onChangeCurrentPeriodHandler", null);
__decorate([
    (0, pubsub_handler_decorator_1.PubsubHandler)({
        subscription: subscription_1.SUBSCRIPTION.CONSUMER,
        filters: [
            {
                entityType: entity_type_1.ENTITY_TYPE.MARKET,
                actionType: action_type_1.ACTION_TYPE.IS_ACTIVE,
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContestInstancePubsubController.prototype, "onMarketIsActive", null);
__decorate([
    (0, pubsub_handler_decorator_1.PubsubHandler)({
        subscription: subscription_1.SUBSCRIPTION.CONSUMER,
        filters: [
            {
                entityType: entity_type_1.ENTITY_TYPE.FIXTURE,
                actionType: action_type_1.ACTION_TYPE.STATUS_CHANGED,
            },
            {
                entityType: entity_type_1.ENTITY_TYPE.FIXTURE,
                actionType: action_type_1.ACTION_TYPE.CURRENT_PERIOD_UPDATED,
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContestInstancePubsubController.prototype, "updateContestInstancesOnFixtureCurrentPeriodChange", null);
__decorate([
    (0, pubsub_handler_decorator_1.PubsubHandler)({
        subscription: subscription_1.SUBSCRIPTION.CONSUMER,
        filters: {
            entityType: entity_type_1.ENTITY_TYPE.MARKET,
            actionType: action_type_1.ACTION_TYPE.IS_NOT_ACTIVE,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContestInstancePubsubController.prototype, "finishContestInstancesOnMarketNotActive", null);
ContestInstancePubsubController = ContestInstancePubsubController_1 = __decorate([
    (0, pubsub_controller_decorator_1.PubsubController)(),
    __metadata("design:paramtypes", [contest_instance_service_1.ContestInstanceService])
], ContestInstancePubsubController);
exports.ContestInstancePubsubController = ContestInstancePubsubController;
//# sourceMappingURL=contest-instance.pubsub-controller.js.map