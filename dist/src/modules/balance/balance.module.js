"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceModule = void 0;
const common_1 = require("@nestjs/common");
const balance_service_1 = require("./balance.service");
const firestore_module_1 = require("../integrations/firebase/firestore/firestore.module");
const firestore_service_1 = require("../integrations/firebase/firestore/firestore.service");
const balance_repository_1 = require("./balance.repository");
const cms_module_1 = require("../integrations/cms/cms.module");
const transaction_manager_module_1 = require("../ancillary/transaction-manager/transaction-manager.module");
const transaction_manager_service_1 = require("../ancillary/transaction-manager/transaction-manager.service");
let BalanceModule = class BalanceModule {
};
BalanceModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [firestore_module_1.FirestoreModule, cms_module_1.CmsModule, transaction_manager_module_1.TransactionManagerModule],
        providers: [
            balance_service_1.BalanceService,
            firestore_service_1.FirestoreService,
            balance_repository_1.BalanceRepository,
            transaction_manager_service_1.TransactionManager,
        ],
        exports: [
            balance_service_1.BalanceService,
            firestore_service_1.FirestoreService,
            balance_repository_1.BalanceRepository,
            transaction_manager_service_1.TransactionManager,
        ],
    })
], BalanceModule);
exports.BalanceModule = BalanceModule;
//# sourceMappingURL=balance.module.js.map