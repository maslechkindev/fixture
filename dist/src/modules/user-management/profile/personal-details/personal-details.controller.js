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
var PersonalDetailsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalDetailsController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../../helpers/swagger/decorators");
const personal_details_service_1 = require("./personal-details.service");
const change_username_service_1 = require("../change-username/change-username.service");
const user_decorator_1 = require("../../../../decorators/user.decorator");
const user_interface_1 = require("../../../../interfaces/user.interface");
const errors_1 = require("../../../../helpers/errors");
const personalDetails_dto_1 = require("./dto/personalDetails.dto");
const personalDetailsEditableFields_dto_1 = require("./dto/personalDetailsEditableFields.dto");
const getUsernameByUserId_dto_1 = require("./dto/getUsernameByUserId.dto");
const getFollowersInfo_dto_1 = require("./dto/getFollowersInfo.dto");
const getReferrerUsername_dto_1 = require("./dto/getReferrerUsername.dto");
let PersonalDetailsController = PersonalDetailsController_1 = class PersonalDetailsController {
    constructor(personalDetailsService, changeUsernameService) {
        this.personalDetailsService = personalDetailsService;
        this.changeUsernameService = changeUsernameService;
        this.logger = new common_1.Logger(PersonalDetailsController_1.name);
    }
    async getUserInfo(user) {
        return this.personalDetailsService.getPersonalDetails(user);
    }
    async getFollowersListInfo(userData, queryInfo) {
        const { id: userId } = userData;
        const { followersIds } = queryInfo;
        try {
            const userFollowersInfo = await this.personalDetailsService.getFollowersListInfo(userId, followersIds);
            return userFollowersInfo;
        }
        catch (err) {
            this.logger.error(`Error during searching for followers info:${err.message}`, err.stack);
            throw err;
        }
    }
    async getReferrerUsername(queryData) {
        const username = await this.personalDetailsService.getReferrerUsername(queryData.code);
        if (!username) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.INVALID_REFERAL_CODE);
        }
        return username;
    }
    async getUsernameByUserId(params) {
        const user = await this.personalDetailsService.getUserById(params.userId);
        if (!user || !user.username) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.INVALID_ID);
        }
        return {
            userId: params.userId,
            username: user.username,
        };
    }
    async getUserPersonalDetailsEditableFields(user) {
        const isUsernameEditable = await this.changeUsernameService.isEditable(user);
        const usernameNotEditableDate = this.changeUsernameService.getUsernameNotEditableDate(user, isUsernameEditable);
        return {
            email: false,
            firstName: !user.firstName,
            lastName: !user.lastName,
            dateOfBirth: !user.dateOfBirth,
            username: isUsernameEditable,
            usernameNotEditableDate: usernameNotEditableDate,
            country: false,
            state: false,
        };
    }
    async changePersonalDetails(user, body) {
        const isPersonalDetailsFieldsEditable = await this.personalDetailsService.checkIfFieldsEditable(body, user);
        if (!isPersonalDetailsFieldsEditable) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.NOT_EDITABLE);
        }
        const isUsernameEditable = await this.changeUsernameService.isEditable(user);
        if (body.username !== user.username && !isUsernameEditable) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.USERNAME_NOT_EDITABLE);
        }
        if (body.username !== user.username && isUsernameEditable) {
            const isUsernameUsed = await this.changeUsernameService.isUsedByOtherUser(user, body.username);
            if (isUsernameUsed) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.USERNAME_EXISTS);
            }
            await this.changeUsernameService.change(user, body.username);
        }
        await this.personalDetailsService.updateUserPersonalDetailsInfo(body, user.id);
        return {
            success: true,
        };
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: personalDetails_dto_1.WrappedPersonalDetailsInfoResponse,
        description: 'Get user info',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Get)('/info'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonalDetailsController.prototype, "getUserInfo", null);
__decorate([
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.AUTH.NOT_LOGGED_IN).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Get)('/followers-info'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, getFollowersInfo_dto_1.getUserFollowersInfoRequestDto]),
    __metadata("design:returntype", Promise)
], PersonalDetailsController.prototype, "getFollowersListInfo", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getReferrerUsername_dto_1.WrappedGetReferrerUsernameDtoResponse,
        description: `Get user's referrer username`,
    }),
    (0, common_1.Get)('/referrer-username'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getReferrerUsername_dto_1.GetReferrerUsernameDtoRequest]),
    __metadata("design:returntype", Promise)
], PersonalDetailsController.prototype, "getReferrerUsername", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getUsernameByUserId_dto_1.WrappedGetUsernameByUserIdDtoResponse,
        description: `Get user's username by userId`,
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.INVALID_ID).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Get)('/:userId/username'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getUsernameByUserId_dto_1.GetUsernameByUserIdDto]),
    __metadata("design:returntype", Promise)
], PersonalDetailsController.prototype, "getUsernameByUserId", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: personalDetailsEditableFields_dto_1.WrappedPersonalDetailsEditableFieldsResponse,
        description: 'Get user personal details editable fields status',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Get)('/editable-fields'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonalDetailsController.prototype, "getUserPersonalDetailsEditableFields", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        schema: {
            example: {
                success: true,
            },
        },
        description: 'User personal details successfully changed',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.LAST_NAME_TOO_LONG).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.LAST_NAME_TOO_SHORT).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.FIRST_NAME_TOO_LONG).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.FIRST_NAME_TOO_SHORT).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.ONLY_LETTER_NUMBERS_ALLOWED).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.CONTAINS_SPECIAL_SYMBOLS).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.FIELD_EMPTY).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.INVALID_DATE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.NOT_EDITABLE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.USERNAME_NOT_EDITABLE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PERSONAL_DETAILS.USERNAME_EXISTS).getResponse(),
                },
            ],
            description: 'User personal details fields validation errors, not editable error',
        },
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, personalDetails_dto_1.PersonalDetailsDto]),
    __metadata("design:returntype", Promise)
], PersonalDetailsController.prototype, "changePersonalDetails", null);
PersonalDetailsController = PersonalDetailsController_1 = __decorate([
    (0, decorators_1.ApiBearerAuth)(),
    (0, decorators_1.ApiTags)('Personal Details'),
    (0, common_1.Controller)('profile/personal-details'),
    __metadata("design:paramtypes", [personal_details_service_1.PersonalDetailsService,
        change_username_service_1.ChangeUsernameService])
], PersonalDetailsController);
exports.PersonalDetailsController = PersonalDetailsController;
//# sourceMappingURL=personal-details.controller.js.map