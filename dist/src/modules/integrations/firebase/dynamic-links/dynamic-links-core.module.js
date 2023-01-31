"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FirebaseDynamicLinksCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseDynamicLinksCoreModule = void 0;
const common_1 = require("@nestjs/common");
const providers_1 = require("./providers");
let FirebaseDynamicLinksCoreModule = FirebaseDynamicLinksCoreModule_1 = class FirebaseDynamicLinksCoreModule {
    static forRoot(options) {
        const provider = (0, providers_1.createFirebaseDynamicLinksProviders)(options);
        return {
            exports: [provider],
            module: FirebaseDynamicLinksCoreModule_1,
            providers: [provider],
        };
    }
};
FirebaseDynamicLinksCoreModule = FirebaseDynamicLinksCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], FirebaseDynamicLinksCoreModule);
exports.FirebaseDynamicLinksCoreModule = FirebaseDynamicLinksCoreModule;
//# sourceMappingURL=dynamic-links-core.module.js.map