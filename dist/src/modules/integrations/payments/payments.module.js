"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const payments_controller_1 = require("./payments.controller");
const payment_service_1 = require("./payment.service");
const payments_repository_1 = require("./payments.repository");
const axios_1 = require("@nestjs/axios");
const transaction_manager_module_1 = require("../../ancillary/transaction-manager/transaction-manager.module");
const balance_module_1 = require("../../balance/balance.module");
const stripe_module_1 = require("../stripe-core/stripe.module");
const payments_pubsub_controller_1 = require("./payments.pubsub-controller");
const firestore_module_1 = require("../firebase/firestore/firestore.module");
let PaymentsModule = class PaymentsModule {
};
PaymentsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            transaction_manager_module_1.TransactionManagerModule,
            balance_module_1.BalanceModule,
            stripe_module_1.StripeModule,
            firestore_module_1.FirestoreModule,
        ],
        controllers: [payments_controller_1.PaymentsController, payments_pubsub_controller_1.PaymentsPubsubController],
        providers: [payment_service_1.PaymentService, payments_repository_1.PaymentRepository],
        exports: [payment_service_1.PaymentService],
    })
], PaymentsModule);
exports.PaymentsModule = PaymentsModule;
//# sourceMappingURL=payments.module.js.map