"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensModule = void 0;
const common_1 = require("@nestjs/common");
const auth_middleware_1 = require("../../../../../middlewares/auth/auth.middleware");
const tokens_service_1 = require("./tokens.service");
const tokens_controller_1 = require("./tokens.controller");
const tokens_repository_1 = require("./tokens.repository");
const firebase_auth_module_1 = require("../../../../user-management/auth/firebase/firebase.auth.module");
const auth_module_1 = require("../../../../../middlewares/auth/auth.module");
let TokensModule = class TokensModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(tokens_controller_1.TokensController);
    }
};
TokensModule = __decorate([
    (0, common_1.Module)({
        controllers: [tokens_controller_1.TokensController],
        providers: [tokens_service_1.TokensService, tokens_repository_1.TokensRepository],
        exports: [tokens_service_1.TokensService],
        imports: [firebase_auth_module_1.FirebaseAuthModule, auth_module_1.AuthMiddlewareModule],
    })
], TokensModule);
exports.TokensModule = TokensModule;
//# sourceMappingURL=tokens.module.js.map