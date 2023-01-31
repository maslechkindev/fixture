"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_middleware_1 = require("../../../../middlewares/auth/auth.middleware");
const personal_details_controller_1 = require("./personal-details.controller");
const personal_details_service_1 = require("./personal-details.service");
const personal_details_repository_1 = require("./personal-details.repository");
const change_username_module_1 = require("../change-username/change-username.module");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const auth_module_1 = require("../../../../middlewares/auth/auth.module");
let PersonalDetailsModule = class PersonalDetailsModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({
            path: 'profile/personal-details/:userId/username',
            method: common_1.RequestMethod.GET,
        }, {
            path: 'profile/personal-details/referrer-username',
            method: common_1.RequestMethod.GET,
        })
            .forRoutes(personal_details_controller_1.PersonalDetailsController);
    }
};
PersonalDetailsModule = __decorate([
    (0, common_1.Module)({
        controllers: [personal_details_controller_1.PersonalDetailsController],
        providers: [
            personal_details_service_1.PersonalDetailsService,
            personal_details_repository_1.PersonalDetailsRepository,
            transaction_manager_service_1.TransactionManager,
        ],
        imports: [change_username_module_1.ChangeUsernameModule, auth_module_1.AuthMiddlewareModule],
    })
], PersonalDetailsModule);
exports.PersonalDetailsModule = PersonalDetailsModule;
//# sourceMappingURL=personal-details.module.js.map