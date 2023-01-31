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
exports.ContestInstanceCmsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contest_instance_service_1 = require("./contest-instance.service");
const searchLiveContestInstances_dto_1 = require("./dto/searchLiveContestInstances.dto");
let ContestInstanceCmsController = class ContestInstanceCmsController {
    constructor(contestInstanceService) {
        this.contestInstanceService = contestInstanceService;
    }
    searchLiveContestInstances({ userId, subString }) {
        return this.contestInstanceService.searchLiveContestInstances(userId, subString);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: searchLiveContestInstances_dto_1.WrappedSearchUserInstanceResponseDto,
    }),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchLiveContestInstances_dto_1.SearchUserContestInstancesDto]),
    __metadata("design:returntype", Promise)
], ContestInstanceCmsController.prototype, "searchLiveContestInstances", null);
ContestInstanceCmsController = __decorate([
    (0, swagger_1.ApiTags)('Cms contest instance'),
    (0, common_1.Controller)('cms/contests/instances'),
    __metadata("design:paramtypes", [contest_instance_service_1.ContestInstanceService])
], ContestInstanceCmsController);
exports.ContestInstanceCmsController = ContestInstanceCmsController;
//# sourceMappingURL=contest-instance.cms.controller.js.map