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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordLinksService = void 0;
const dynamic_links_1 = require("../../../../integrations/firebase/dynamic-links");
const config_1 = require("../../../../../config");
const { ANDROID_PACKAGE_NAME, DOMAIN_URI_PREFIX, IOS_BUNDLE_ID, IOS_APP_STORE_ID, } = config_1.default.FIREBASE.DYNAMIC_LINKS;
const { LINK_PREFIX } = config_1.default;
let ForgotPasswordLinksService = class ForgotPasswordLinksService {
    constructor(firebaseDynamicLinksService) {
        this.firebaseDynamicLinksService = firebaseDynamicLinksService;
    }
    async create(token) {
        const linkToSend = `${LINK_PREFIX}auth/forgot-password/confirmation/${token}`;
        const { shortLink } = await this.firebaseDynamicLinksService.createLink({
            dynamicLinkInfo: {
                domainUriPrefix: DOMAIN_URI_PREFIX,
                link: linkToSend,
                androidInfo: {
                    androidPackageName: ANDROID_PACKAGE_NAME,
                },
                iosInfo: {
                    iosBundleId: IOS_BUNDLE_ID,
                    iosAppStoreId: IOS_APP_STORE_ID,
                },
            },
        });
        return shortLink;
    }
};
ForgotPasswordLinksService = __decorate([
    __param(0, (0, dynamic_links_1.InjectFirebaseDynamicLinks)()),
    __metadata("design:paramtypes", [dynamic_links_1.FirebaseDynamicLinksService])
], ForgotPasswordLinksService);
exports.ForgotPasswordLinksService = ForgotPasswordLinksService;
//# sourceMappingURL=forgot-password-links.service.js.map