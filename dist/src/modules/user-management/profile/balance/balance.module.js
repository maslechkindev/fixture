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
const auth_middleware_1 = require("../../../../middlewares/auth/auth.middleware");
const auth_module_1 = require("../../../../middlewares/auth/auth.module");
const cms_module_1 = require("../../../integrations/cms/cms.module");
const balance_controller_1 = require("./balance.controller");
const balance_repository_1 = require("./balance.repository");
const balance_service_1 = require("./balance.service");
let BalanceModule = class BalanceModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(balance_controller_1.BalanceController);
    }
};
BalanceModule = __decorate([
    (0, common_1.Module)({
        imports: [cms_module_1.CmsModule, auth_module_1.AuthMiddlewareModule],
        controllers: [balance_controller_1.BalanceController],
        providers: [balance_service_1.BalanceService, balance_repository_1.BalanceRepository],
    })
], BalanceModule);
exports.BalanceModule = BalanceModule;
//# sourceMappingURL=balance.module.js.map