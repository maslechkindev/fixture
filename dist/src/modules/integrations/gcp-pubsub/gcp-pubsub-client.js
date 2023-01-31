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
exports.GcpPubsubClient = void 0;
const common_1 = require("@nestjs/common");
const pubsub_1 = require("@google-cloud/pubsub");
const config_1 = require("../../../config");
const { PUBSUB: { PROJECT_ID, CREDENTIALS, SUBSCRIPTIONS }, } = config_1.default;
const pubSubClient = new pubsub_1.PubSub({
    projectId: PROJECT_ID,
    credentials: CREDENTIALS,
});
let GcpPubsubClient = class GcpPubsubClient {
    constructor() {
        this.subscriptions = SUBSCRIPTIONS.map(({ SUBSCRIPTION, NAME }) => {
            const subscription = pubSubClient.subscription(SUBSCRIPTION);
            return { subscription, name: NAME };
        });
    }
    enhancedListener(listener, subscription, message) {
        return listener(subscription, message);
    }
    onMessage(listener) {
        this.subscriptions.map(({ name, subscription }) => subscription.on('message', (message) => this.enhancedListener(listener, name, message)));
    }
    stopListenMessage(listener) {
        this.subscriptions.map(({ subscription }) => subscription.off('message', listener));
    }
    async onModuleDestroy() {
        this.subscriptions.map(({ subscription }) => subscription.close());
    }
};
GcpPubsubClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GcpPubsubClient);
exports.GcpPubsubClient = GcpPubsubClient;
//# sourceMappingURL=gcp-pubsub-client.js.map