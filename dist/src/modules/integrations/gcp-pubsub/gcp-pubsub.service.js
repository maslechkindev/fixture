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
var GcpPubsubService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpPubsubService = void 0;
const common_1 = require("@nestjs/common");
const R = require("ramda");
const gcp_pubsub_client_1 = require("./gcp-pubsub-client");
let GcpPubsubService = GcpPubsubService_1 = class GcpPubsubService {
    constructor(gcpPubsubService) {
        this.gcpPubsubService = gcpPubsubService;
        this.logger = new common_1.Logger(GcpPubsubService_1.name);
        this.pathToHandler = new Map();
        this.defaultHandlers = [];
        this.rootHandler = async (subscription, message) => {
            const handlerPath = this.convertMessageAttributesToHandlersPath(subscription, (message === null || message === void 0 ? void 0 : message.attributes) || {});
            this.logger.log(`Pubsub message: id=${message === null || message === void 0 ? void 0 : message.id}, attr={${handlerPath}},`);
            const pubsubMessage = this.convertNativeGcpMessageToPubsubMessage(message);
            this.logger.log(`rootHandler: pubsubMessage {${JSON.stringify(pubsubMessage.body)}}`);
            try {
                const messageHandlers = [
                    ...this.defaultHandlers,
                    ...(this.pathToHandler.get(handlerPath) || []),
                ];
                const response = await Promise.allSettled(messageHandlers.map((handler) => handler(pubsubMessage)));
                this.logger.log(`rootHandler: pubsubMessage
        {${JSON.stringify(pubsubMessage.body)}}
        {${JSON.stringify({
                    messageHandlers,
                    response: JSON.stringify(response),
                })}}`);
                message.ack();
            }
            catch (err) {
                this.logger.error(`Error on message: id=${message.id}, attr={${handlerPath}}`, err);
                message.ack();
            }
        };
        this.convertHandlerFilterToPath = (subscription, handlerFilter) => {
            var _a, _b;
            return `${subscription}:${(_a = handlerFilter.entityType) !== null && _a !== void 0 ? _a : ''}:${(_b = handlerFilter.actionType) !== null && _b !== void 0 ? _b : ''}`;
        };
        this.convertMessageAttributesToHandlersPath = (subscription, messageAttributes) => {
            var _a, _b;
            return `${subscription}:${(_a = messageAttributes.entityType) !== null && _a !== void 0 ? _a : ''}:${(_b = messageAttributes.actionType) !== null && _b !== void 0 ? _b : ''}`;
        };
        this.gcpPubsubService.onMessage(this.rootHandler);
    }
    subscribe(handler, handlerName, handlerConfig) {
        const filters = R.isNil(handlerConfig === null || handlerConfig === void 0 ? void 0 : handlerConfig.filters)
            ? []
            : Array.isArray(handlerConfig === null || handlerConfig === void 0 ? void 0 : handlerConfig.filters)
                ? handlerConfig === null || handlerConfig === void 0 ? void 0 : handlerConfig.filters
                : [handlerConfig === null || handlerConfig === void 0 ? void 0 : handlerConfig.filters];
        const notEmptyFilters = filters.filter(({ actionType, entityType }) => !!actionType || !!entityType);
        if (R.isEmpty(notEmptyFilters)) {
            this.defaultHandlers.push(handler);
            this.logger.log(`Mapped ${handlerName} on all messages`);
            return;
        }
        notEmptyFilters.forEach((filter) => {
            const handlerPath = this.convertHandlerFilterToPath(handlerConfig.subscription, filter);
            const existingHandlers = this.pathToHandler.get(handlerPath) || [];
            existingHandlers.push(handler);
            this.pathToHandler.set(handlerPath, existingHandlers);
            this.logger.log(`Mapped ${handlerName} on {${handlerPath}}`);
        });
    }
    convertNativeGcpMessageToPubsubMessage(nativeMessage) {
        const messageBody = (nativeMessage.data && JSON.parse(nativeMessage.data.toString())) || {};
        return Object.assign(Object.assign({}, R.omit(['ack', 'nack', 'data', 'modAck'], nativeMessage)), { body: messageBody });
    }
};
GcpPubsubService = GcpPubsubService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gcp_pubsub_client_1.GcpPubsubClient])
], GcpPubsubService);
exports.GcpPubsubService = GcpPubsubService;
//# sourceMappingURL=gcp-pubsub.service.js.map