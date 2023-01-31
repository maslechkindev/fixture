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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../../helpers/swagger/decorators");
const users_service_1 = require("./users.service");
const errors_1 = require("../../../../helpers/errors");
const userStatus_1 = require("../../../../enums/userStatus");
const account_confirmation_service_1 = require("../../auth/user-activity-links/account-confirmation/account-confirmation.service");
const getUsers_dto_1 = require("./dto/getUsers.dto");
const getUser_dto_1 = require("./dto/getUser.dto");
const updateUser_dto_1 = require("./dto/updateUser.dto");
const banUser_dto_1 = require("./dto/banUser.dto");
const setPremiumTerms_dto_1 = require("./dto/setPremiumTerms.dto");
const getUserTransactions_dto_1 = require("./dto/getUserTransactions.dto");
const replenishBalance_dto_1 = require("./dto/replenishBalance.dto");
const getUsernameStatistics_dto_1 = require("./dto/getUsernameStatistics.dto");
const queryParams_dto_1 = require("./dto/queryParams.dto");
const filters_dto_1 = require("./dto/filters.dto");
const config_1 = require("../../../../config");
const getHomeLink_dto_1 = require("./dto/getHomeLink.dto");
const mailing_1 = require("../../../integrations/mailing");
let UsersController = class UsersController {
    constructor(usersService, accountConfirmationService, mailingClient) {
        this.usersService = usersService;
        this.accountConfirmationService = accountConfirmationService;
        this.mailingClient = mailingClient;
    }
    async getUsers(params) {
        const { page, size, direction, orderBy, search } = params;
        const { users, count } = await this.usersService.getUsers({
            page,
            size,
            direction,
            orderBy,
            search,
        });
        return { users, count };
    }
    async getUser(params) {
        const user = await this.usersService.getUser(params);
        if (!user) {
            return {
                user: null,
                banInfo: null,
                premiumInfo: null,
                balanceInfo: null,
            };
        }
        const banInfo = await this.usersService.getBanInfo(user.id);
        const premiumInfo = await this.usersService.getPremiumInfo(user.id);
        const balanceInfo = await this.usersService.getBalanceInfo(user.id);
        return { user, banInfo, premiumInfo, balanceInfo };
    }
    async updateUser(body) {
        var _a, _b, _c;
        const { user: userFromBody } = body;
        const user = await this.usersService.getUser({ id: userFromBody.id });
        if (!user) {
            throw new errors_1.NotFoundExceptionCustom(errors_1.ERRORS.MANAGEMENT.USER_NOT_FOUND);
        }
        const userStatusChanged = user.status !== userFromBody.status;
        const notificationsEnabledChanged = user.notificationsEnabled !== userFromBody.notificationsEnabled;
        const updatedUser = await this.usersService.updateUser(userFromBody, user);
        if (userStatusChanged && userFromBody.status === userStatus_1.userStatus.NOT_CONFIRMED) {
            const token = await this.accountConfirmationService.createAndSetEmailVerificationToken(updatedUser.email);
            await this.accountConfirmationService.sendConfirmationEmail(updatedUser.email, token, config_1.default.EXPIRATIONS.CONFIRMATION_EMAIL
                .ACCOUNT_CONFIRMATION_EMAIL_TEMPLATE_ID);
        }
        if (notificationsEnabledChanged) {
            if (updatedUser.notificationsEnabled) {
                this.mailingClient.addUpdateContact({
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    country: updatedUser.country,
                    state: updatedUser.state,
                    username: updatedUser.username,
                    registrationDate: (_a = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString(),
                    accountConfirmationDate: (_b = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.confirmedAt) === null || _b === void 0 ? void 0 : _b.toISOString(),
                    dateOfBirth: (_c = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.dateOfBirth) === null || _c === void 0 ? void 0 : _c.toISOString(),
                });
            }
            else if (updatedUser.notificationsEnabled === false) {
                this.mailingClient.removeContact({ email: updatedUser.email });
            }
        }
        return { success: true, updatedUser };
    }
    async updatePremiumTerms(body) {
        const { id, startTime, endTime } = body;
        const user = await this.usersService.getUser({ id });
        if (!user) {
            throw new errors_1.NotFoundExceptionCustom(errors_1.ERRORS.MANAGEMENT.USER_NOT_FOUND);
        }
        const record = await this.usersService.updatePremiumInfo(user.id, startTime, endTime);
        return {
            success: true,
            record,
        };
    }
    async banUser(body) {
        const { id, reason } = body;
        const user = await this.usersService.getUser({ id });
        if (!user) {
            throw new errors_1.NotFoundExceptionCustom(errors_1.ERRORS.MANAGEMENT.USER_NOT_FOUND);
        }
        const record = await this.usersService.banUser(user.id, reason);
        return {
            success: true,
            record,
        };
    }
    async getUserTransactions(params, userId, filters) {
        const userTransactions = await this.usersService.getUserTransactions(userId, params, filters);
        const count = Array.isArray(userTransactions) && userTransactions.length > 0
            ? userTransactions[0].fullcount
            : 0;
        return {
            userTransactions,
            count,
        };
    }
    async manualReplenishUserBalance(body) {
        const result = await this.usersService.manualReplenishUserBalance(body);
        return { success: true, balances: Object.assign({}, result) };
    }
    async usernameStatistics() {
        const confirmedAccounts = await this.usersService.getConfirmedUsersCount();
        const freeUsernames = await this.usersService.getFreeUsernamesCount();
        return { confirmedAccounts, freeUsernames };
    }
    async getUserDynamicHomeLinkWithPromoCode(query) {
        const { promoCode } = await this.usersService.getUser({ id: query.userId });
        const { shortLink } = await this.usersService.getDynamicHomeLinkWithPromoCode(promoCode);
        return { link: shortLink };
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getUsers_dto_1.WrappedGetUsersResponseDto,
        description: 'Success',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.UNKNOWN_REFERRAL_CODE).getResponse(),
                },
            ],
        },
        description: 'Success',
    }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getUsers_dto_1.GetUsersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getUser_dto_1.WrappedGetUserResponseDto,
        description: 'Success',
    }),
    (0, common_1.Get)('/single'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getUser_dto_1.GetUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: updateUser_dto_1.WrappedUpdateUserResponseDto,
        description: 'Successfully updated user',
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)('/single'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: setPremiumTerms_dto_1.WrappedSetPremiumTermsResponseDto,
        description: 'Successfully set premium terms',
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)('/premium'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setPremiumTerms_dto_1.SetPremiumTermsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePremiumTerms", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: banUser_dto_1.WrappedBanUserResponseDto,
        description: 'Successfully banned/unbanned user',
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)('/ban'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [banUser_dto_1.BanUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "banUser", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getUserTransactions_dto_1.WrappedGetUserTransactionsResponseDto,
        description: 'Success',
    }),
    (0, common_1.Post)('/user/:userId/transactions'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [queryParams_dto_1.QueryParamsDTO, String, filters_dto_1.FiltersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserTransactions", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: replenishBalance_dto_1.WrappedReplenishBalanceResponseDto,
        description: 'Success',
    }),
    (0, common_1.Put)('/replenish-balance'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [replenishBalance_dto_1.ReplenishBalanceDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "manualReplenishUserBalance", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getUsernameStatistics_dto_1.WrappedGetUsernameStatisticsResponseDto,
        description: 'Success',
    }),
    (0, common_1.Get)('/username-statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "usernameStatistics", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: getHomeLink_dto_1.WrappedGetHomeLink,
        description: 'Success',
    }),
    (0, common_1.Get)('/home-link'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getHomeLink_dto_1.GetHomeLinkRequestDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserDynamicHomeLinkWithPromoCode", null);
UsersController = __decorate([
    (0, decorators_1.ApiTags)('User management'),
    (0, common_1.Controller)('management/users'),
    __param(2, (0, mailing_1.InjectMailing)()),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        account_confirmation_service_1.AccountConfirmationService,
        mailing_1.MailingService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map