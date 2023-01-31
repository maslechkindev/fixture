"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModule = void 0;
const common_1 = require("@nestjs/common");
const purchase_controller_1 = require("./purchase.controller");
const purchase_service_1 = require("./purchase.service");
const auth_middleware_1 = require("../../middlewares/auth/auth.middleware");
const auth_module_1 = require("../../middlewares/auth/auth.module");
const purchase_repository_1 = require("./purchase.repository");
const entry_module_1 = require("../user-management/auth/entry/entry.module");
let PurchaseModule = class PurchaseModule {
    configure(userContext) {
        userContext.apply(auth_middleware_1.AuthMiddleware).forRoutes(purchase_controller_1.PurchaseController);
    }
};
PurchaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [auth_module_1.AuthMiddlewareModule, entry_module_1.EntryModule],
        controllers: [purchase_controller_1.PurchaseController],
        providers: [purchase_service_1.PurchaseService, purchase_repository_1.PurchaseRepository],
        exports: [purchase_service_1.PurchaseService],
    })
], PurchaseModule);
exports.PurchaseModule = PurchaseModule;
//# sourceMappingURL=purchase.module.js.map