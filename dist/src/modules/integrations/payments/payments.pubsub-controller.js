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
var PaymentsPubsubController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsPubsubController = void 0;
const pubsub_controller_decorator_1 = require("../gcp-pubsub/decorators/pubsub-controller.decorator");
const pubsub_handler_decorator_1 = require("../gcp-pubsub/decorators/pubsub-handler.decorator");
const action_type_1 = require("../gcp-pubsub/enums/action-type");
const pubsub_message_interface_1 = require("../gcp-pubsub/interfaces/pubsub-message.interface");
const subscription_1 = require("../gcp-pubsub/enums/subscription");
const payment_service_1 = require("./payment.service");
const common_1 = require("@nestjs/common");
let PaymentsPubsubController = PaymentsPubsubController_1 = class PaymentsPubsubController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
        this.logger = new common_1.Logger(PaymentsPubsubController_1.name);
    }
    async onChangePaymentStatus(message) {
        this.logger.log(`data from Pubsub:${JSON.stringify({
            status: message.body.status,
            paymentId: message.body.paymentId,
        })}`);
        await this.paymentsService.processPaymentInfo(message.body.status, message.body.paymentId);
    }
};
__decorate([
    (0, pubsub_handler_decorator_1.PubsubHandler)({
        subscription: subscription_1.SUBSCRIPTION.PAYMENTS,
        filters: [{ actionType: action_type_1.ACTION_TYPE.PAYMENT_STATUS_CHANGED }],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsPubsubController.prototype, "onChangePaymentStatus", null);
PaymentsPubsubController = PaymentsPubsubController_1 = __decorate([
    (0, pubsub_controller_decorator_1.PubsubController)(),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentsPubsubController);
exports.PaymentsPubsubController = PaymentsPubsubController;
//# sourceMappingURL=payments.pubsub-controller.js.map