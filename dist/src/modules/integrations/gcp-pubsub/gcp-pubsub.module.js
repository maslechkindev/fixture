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
var GcpPubsubModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpPubsubModule = void 0;
const common_1 = require("@nestjs/common");
const external_context_creator_1 = require("@nestjs/core/helpers/external-context-creator");
const nestjs_discovery_1 = require("@golevelup/nestjs-discovery");
const gcp_pubsub_constants_1 = require("./gcp-pubsub.constants");
const gcp_pubsub_client_1 = require("./gcp-pubsub-client");
const gcp_pubsub_service_1 = require("./gcp-pubsub.service");
let GcpPubsubModule = GcpPubsubModule_1 = class GcpPubsubModule {
    constructor(discoveryService, gcpPubsubService, externalContextCreator) {
        this.discoveryService = discoveryService;
        this.gcpPubsubService = gcpPubsubService;
        this.externalContextCreator = externalContextCreator;
        this.logger = new common_1.Logger(GcpPubsubModule_1.name);
    }
    async onApplicationBootstrap() {
        const allPubsubHandlers = await this.discoveryService.controllerMethodsWithMetaAtKey(gcp_pubsub_constants_1.GCP_PUBSUB_HANDLER);
        allPubsubHandlers.forEach((h) => {
            const boundHandler = this.externalContextCreator.create(h.discoveredMethod.parentClass.instance, h.discoveredMethod.handler, h.discoveredMethod.methodName);
            const handlerName = `${h.discoveredMethod.parentClass.name}.${h.discoveredMethod.methodName}`;
            this.gcpPubsubService.subscribe(boundHandler, handlerName, h.meta);
        });
        this.logger.log('Pubsub handlers successfully mapped');
    }
};
GcpPubsubModule = GcpPubsubModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_discovery_1.DiscoveryModule],
        providers: [gcp_pubsub_client_1.GcpPubsubClient, gcp_pubsub_service_1.GcpPubsubService],
    }),
    __metadata("design:paramtypes", [nestjs_discovery_1.DiscoveryService,
        gcp_pubsub_service_1.GcpPubsubService,
        external_context_creator_1.ExternalContextCreator])
], GcpPubsubModule);
exports.GcpPubsubModule = GcpPubsubModule;
//# sourceMappingURL=gcp-pubsub.module.js.map