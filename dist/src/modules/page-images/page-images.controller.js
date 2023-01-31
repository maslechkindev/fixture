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
exports.PageImagesController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../helpers/swagger/decorators");
const errors_1 = require("../../helpers/errors");
const user_decorator_1 = require("../../decorators/user.decorator");
const page_images_service_1 = require("./page-images.service");
let PageImagesController = class PageImagesController {
    constructor(pageImagesService) {
        this.pageImagesService = pageImagesService;
    }
    async contestInstanceLeaderboard(res, contestId, instanceId, userId, user) {
        const image = await this.pageImagesService.generateLeaderboardImage(user, contestId, instanceId, userId);
        res.contentType('image/png');
        res.end(image, 'binary');
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        description: 'Binary',
    }),
    (0, common_1.Get)('contest/odds/leaderboard/:contestId/:instanceId/:userId'),
    (0, decorators_1.ApiBadRequestResponseWithMultipleExceptions)([
        {
            exceptionBody: errors_1.ERRORS.LEADERBOARD_SHARING.SHARING_NOT_ALLOWED_FOR_NOT_FINISHED_CONTEST,
        },
        { exceptionBody: errors_1.ERRORS.LEADERBOARD_SHARING.INVALID_CONTEST_INSTANCE_ID },
        {
            exceptionBody: errors_1.ERRORS.LEADERBOARD_SHARING.UNAUTHORIZED_TO_SHARE_LEADERBOARD,
        },
    ]),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Param)('contestId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Param)('instanceId', common_1.ParseUUIDPipe)),
    __param(3, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(4, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], PageImagesController.prototype, "contestInstanceLeaderboard", null);
PageImagesController = __decorate([
    (0, decorators_1.ApiBearerAuth)(),
    (0, decorators_1.ApiTags)('Page images'),
    (0, common_1.Controller)('page-images'),
    __metadata("design:paramtypes", [page_images_service_1.PageImagesService])
], PageImagesController);
exports.PageImagesController = PageImagesController;
//# sourceMappingURL=page-images.controller.js.map