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
exports.FixtureController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fixture_service_1 = require("./fixture.service");
const decorators_1 = require("../../helpers/swagger/decorators");
const decorators_2 = require("../../helpers/swagger/decorators");
const getActiveFixtures_dto_1 = require("./dto/getActiveFixtures.dto");
let FixtureController = class FixtureController {
    constructor(fixtureService) {
        this.fixtureService = fixtureService;
    }
    async getActiveFixtures(params) {
        const fixtures = await this.fixtureService.getActive(params);
        return fixtures;
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getActiveFixtures_dto_1.WrappedGetActiveFixturesResponse,
        description: 'Success',
    }),
    (0, common_1.Get)('/active'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getActiveFixtures_dto_1.GetActiveFixturesRequestDto]),
    __metadata("design:returntype", Promise)
], FixtureController.prototype, "getActiveFixtures", null);
FixtureController = __decorate([
    (0, decorators_2.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Fixture'),
    (0, common_1.Controller)('fixture'),
    __metadata("design:paramtypes", [fixture_service_1.FixtureService])
], FixtureController);
exports.FixtureController = FixtureController;
//# sourceMappingURL=fixture.controller.js.map