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
exports.DynamicLinksController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../../helpers/swagger/decorators");
const common_2 = require("./common");
const index_1 = require("./index");
const getDynamicLink_dto_1 = require("./dto/getDynamicLink.dto");
const config_1 = require("../../../../config");
const swagger_1 = require("@nestjs/swagger");
const errors_1 = require("../../../../helpers/errors");
const { ANDROID_PACKAGE_NAME, DOMAIN_URI_PREFIX, IOS_BUNDLE_ID, IOS_APP_STORE_ID, } = config_1.default.FIREBASE.DYNAMIC_LINKS;
let DynamicLinksController = class DynamicLinksController {
    constructor(firebaseDynamicLinksService) {
        this.firebaseDynamicLinksService = firebaseDynamicLinksService;
    }
    async generate({ link, socialTitle, socialDescription, socialImageLink, }) {
        try {
            const data = {
                dynamicLinkInfo: {
                    domainUriPrefix: DOMAIN_URI_PREFIX,
                    link: link,
                    androidInfo: {
                        androidPackageName: ANDROID_PACKAGE_NAME,
                    },
                    iosInfo: {
                        iosBundleId: IOS_BUNDLE_ID,
                        iosAppStoreId: IOS_APP_STORE_ID,
                    },
                },
            };
            if (socialTitle && socialDescription && socialImageLink) {
                data.dynamicLinkInfo.socialMetaTagInfo = {
                    socialTitle,
                    socialDescription,
                    socialImageLink,
                };
            }
            const { shortLink } = await this.firebaseDynamicLinksService.createLink(data);
            return { shortLink };
        }
        catch (err) {
            throw new errors_1.BadRequestExceptionCustom({
                code: 'ERR-34',
                message: err.message,
            });
        }
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getDynamicLink_dto_1.WrappedGetDynamicLinksResponseDto,
        description: 'Success',
    }),
    (0, common_1.Post)('/generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getDynamicLink_dto_1.DynamicLinksBodyDto]),
    __metadata("design:returntype", Promise)
], DynamicLinksController.prototype, "generate", null);
DynamicLinksController = __decorate([
    (0, swagger_1.ApiTags)('Integrations'),
    (0, common_1.Controller)('dynamic-links'),
    __param(0, (0, common_2.InjectFirebaseDynamicLinks)()),
    __metadata("design:paramtypes", [index_1.FirebaseDynamicLinksService])
], DynamicLinksController);
exports.DynamicLinksController = DynamicLinksController;
//# sourceMappingURL=dynamic-links.controller.js.map