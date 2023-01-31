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
var MarketLinesPubsubController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketLinesPubsubController = void 0;
const common_1 = require("@nestjs/common");
const pubsub_controller_decorator_1 = require("../integrations/gcp-pubsub/decorators/pubsub-controller.decorator");
const pubsub_handler_decorator_1 = require("../integrations/gcp-pubsub/decorators/pubsub-handler.decorator");
const action_type_1 = require("../integrations/gcp-pubsub/enums/action-type");
const entity_type_1 = require("../integrations/gcp-pubsub/enums/entity-type");
const subscription_1 = require("../integrations/gcp-pubsub/enums/subscription");
const pubsub_message_interface_1 = require("../integrations/gcp-pubsub/interfaces/pubsub-message.interface");
const bets_service_1 = require("../contest-instance/bets/bets.service");
const contest_instance_service_1 = require("../contest-instance/contest-instance.service");
const market_lines_service_1 = require("./market-lines.service");
let MarketLinesPubsubController = MarketLinesPubsubController_1 = class MarketLinesPubsubController {
    constructor(betsService, contestInstanceService, marketsLinesService) {
        this.betsService = betsService;
        this.contestInstanceService = contestInstanceService;
        this.marketsLinesService = marketsLinesService;
        this.logger = new common_1.Logger(MarketLinesPubsubController_1.name);
    }
    async onMarketLineChangeStatus(message) {
        if (!message.body.marketLineId) {
            this.logger.error(`onMarketLineChangeStatus: no marketLineId`);
            return;
        }
        if (!message.body.statusId) {
            this.logger.error(`onMarketLineChangeStatus: no statusId`);
            return;
        }
        this.logger.log(`OUTCOME_CHANGED_NOTIFICATION_DEBUG@ calling event handler with such PubSub message data: ${JSON.stringify({
            messageId: message.id,
            marketLineId: message.body.marketLineId,
            statusId: message.body.statusId,
        })}`);
        return this.marketsLinesService.onMarketLineChangeStatus(message.body.marketLineId, message.body.statusId);
    }
};
__decorate([
    (0, pubsub_handler_decorator_1.PubsubHandler)({
        subscription: subscription_1.SUBSCRIPTION.CONSUMER,
        filters: {
            entityType: entity_type_1.ENTITY_TYPE.MARKET_LINE,
            actionType: action_type_1.ACTION_TYPE.STATUS_CHANGED,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarketLinesPubsubController.prototype, "onMarketLineChangeStatus", null);
MarketLinesPubsubController = MarketLinesPubsubController_1 = __decorate([
    (0, pubsub_controller_decorator_1.PubsubController)(),
    __metadata("design:paramtypes", [bets_service_1.BetsService,
        contest_instance_service_1.ContestInstanceService,
        market_lines_service_1.MarketLinesService])
], MarketLinesPubsubController);
exports.MarketLinesPubsubController = MarketLinesPubsubController;
//# sourceMappingURL=market-lines.pubsub-controller.js.map