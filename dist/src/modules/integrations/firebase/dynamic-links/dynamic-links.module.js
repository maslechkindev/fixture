"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FirebaseDynamicLinksModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseDynamicLinksModule = void 0;
const common_1 = require("@nestjs/common");
const dynamic_links_core_module_1 = require("./dynamic-links-core.module");
const dynamic_links_controller_1 = require("./dynamic-links.controller");
let FirebaseDynamicLinksModule = FirebaseDynamicLinksModule_1 = class FirebaseDynamicLinksModule {
    static forRoot(options) {
        return {
            module: FirebaseDynamicLinksModule_1,
            controllers: [dynamic_links_controller_1.DynamicLinksController],
            imports: [dynamic_links_core_module_1.FirebaseDynamicLinksCoreModule.forRoot(options)],
        };
    }
};
FirebaseDynamicLinksModule = FirebaseDynamicLinksModule_1 = __decorate([
    (0, common_1.Module)({})
], FirebaseDynamicLinksModule);
exports.FirebaseDynamicLinksModule = FirebaseDynamicLinksModule;
//# sourceMappingURL=dynamic-links.module.js.map