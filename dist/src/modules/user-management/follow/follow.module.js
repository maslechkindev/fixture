"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowModule = void 0;
const common_1 = require("@nestjs/common");
const follow_controller_1 = require("./follow.controller");
const follow_service_1 = require("./follow.service");
const follow_repository_1 = require("./follow.repository");
const auth_middleware_1 = require("../../../middlewares/auth/auth.middleware");
const auth_module_1 = require("../../../middlewares/auth/auth.module");
let FollowModule = class FollowModule {
    configure(userContext) {
        userContext.apply(auth_middleware_1.AuthMiddleware).forRoutes(follow_controller_1.FollowController);
    }
};
FollowModule = __decorate([
    (0, common_1.Module)({
        controllers: [follow_controller_1.FollowController],
        providers: [follow_service_1.FollowService, follow_repository_1.FollowRepository],
        imports: [auth_module_1.AuthMiddlewareModule, auth_module_1.AuthMiddlewareModule],
        exports: [follow_service_1.FollowService, follow_repository_1.FollowRepository],
    })
], FollowModule);
exports.FollowModule = FollowModule;
//# sourceMappingURL=follow.module.js.map