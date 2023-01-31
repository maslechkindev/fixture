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
exports.ForgotPasswordController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../../../helpers/swagger/decorators");
const forgot_password_service_1 = require("./forgot-password.service");
const forgot_password_email_service_1 = require("./forgot-password-email.service");
const forgot_password_links_service_1 = require("./forgot-password-links.service");
const config_1 = require("../../../../../config");
const dto_1 = require("./dto");
const entry_service_1 = require("../../entry/entry.service");
const firebase_auth_service_1 = require("../../firebase/firebase.auth.service");
const errors_1 = require("../../../../../helpers/errors");
const helpers_1 = require("../../helpers");
const changePasswordResponse_dto_1 = require("./dto/changePasswordResponse.dto");
const changeForgotPassword_dto_1 = require("./dto/changeForgotPassword.dto");
const userStatus_1 = require("../../../../../enums/userStatus");
const account_confirmation_service_1 = require("../account-confirmation/account-confirmation.service");
let ForgotPasswordController = class ForgotPasswordController {
    constructor(forgotPasswordService, forgotPasswordEmailService, forgotPasswordLinksService, entryService, firebaseAuthService, accountConfirmationService) {
        this.forgotPasswordService = forgotPasswordService;
        this.forgotPasswordEmailService = forgotPasswordEmailService;
        this.forgotPasswordLinksService = forgotPasswordLinksService;
        this.entryService = entryService;
        this.firebaseAuthService = firebaseAuthService;
        this.accountConfirmationService = accountConfirmationService;
    }
    async request(body, ip) {
        const { email } = body;
        const minutesBlocked = await this.forgotPasswordService.isBlockedToRestore(email, ip);
        if (minutesBlocked) {
            throw new errors_1.TooManyRequestsExceptionCustom(Object.assign(Object.assign({}, errors_1.ERRORS.TOO_MANY_REQUESTS), { info: { minutesBlocked } }));
        }
        const token = await this.forgotPasswordService.createAndSetToken(email, ip);
        const user = await this.entryService.getUserByEmail(email);
        if (!user) {
            return {
                success: true,
            };
        }
        if (user.status === userStatus_1.userStatus.NOT_CONFIRMED) {
            const confirmationToken = await this.accountConfirmationService.createAndSetEmailVerificationToken(user.email);
            await this.accountConfirmationService.sendConfirmationEmail(user.email, confirmationToken, config_1.default.EXPIRATIONS.CONFIRMATION_EMAIL
                .ACCOUNT_CONFIRMATION_EMAIL_TEMPLATE_ID);
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FORGOT_PASSWORD.ACCOUNT_NOT_CONFIRMED);
        }
        const shortLink = await this.forgotPasswordLinksService.create(token);
        this.forgotPasswordEmailService.send(email, shortLink, user.username, config_1.default.EXPIRATIONS.CONFIRMATION_EMAIL
            .RESET_PASSWORD_CONFIRMATION_EMAIL_TEMPLATE_ID);
        return {
            success: true,
        };
    }
    async verify(req, body) {
        const tokenInfo = await this.forgotPasswordService.getTokenInfo(body.token);
        if (!tokenInfo) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.INVALID_TOKEN);
        }
        const loginToken = (0, helpers_1.extractToken)(req);
        if (loginToken) {
            const user = await this.firebaseAuthService.verifyIdToken(loginToken);
            if (!user) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.WRONG_USER);
            }
            const userData = await this.entryService.getUserById(user.userId);
            if (userData.email !== tokenInfo.email) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.WRONG_USER);
            }
        }
        return {
            success: true,
        };
    }
    async changePassword(req, body) {
        const tokenInfo = await this.forgotPasswordService.getTokenInfo(body.token);
        if (!tokenInfo) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FORGOT_PASSWORD.INVALID_TOKEN);
        }
        const userData = await this.entryService.getUserByEmail(tokenInfo.email);
        if (userData.email !== tokenInfo.email) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FORGOT_PASSWORD.WRONG_USER);
        }
        const token = await this.forgotPasswordService.changePassword(userData, body.password);
        return {
            success: true,
            customToken: token,
        };
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        schema: {
            example: {
                success: 'true',
            },
        },
        description: 'Email will be send if account exists',
    }),
    (0, decorators_1.ApiTooManyRequestsResponse)({
        schema: {
            example: new errors_1.TooManyRequestsExceptionCustom(errors_1.ERRORS.TOO_MANY_REQUESTS).getResponse(),
            description: 'Too many requests',
        },
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_INVALID).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FORGOT_PASSWORD.ACCOUNT_NOT_CONFIRMED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/request'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ForgotPasswordRequestDto, String]),
    __metadata("design:returntype", Promise)
], ForgotPasswordController.prototype, "request", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        schema: {
            example: {
                success: true,
            },
        },
        description: 'Verify token',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.INVALID_TOKEN).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.WRONG_USER).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.ForgotPasswordVerifyDto]),
    __metadata("design:returntype", Promise)
], ForgotPasswordController.prototype, "verify", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: changePasswordResponse_dto_1.WrappedChangePasswordResponse,
        description: 'Change password',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FORGOT_PASSWORD.INVALID_TOKEN).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FORGOT_PASSWORD.WRONG_USER).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FORGOT_PASSWORD.USER_PREVIOUS_PASSWORD).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/change-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, changeForgotPassword_dto_1.ChangeForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], ForgotPasswordController.prototype, "changePassword", null);
ForgotPasswordController = __decorate([
    (0, decorators_1.ApiTags)('Forgot password'),
    (0, common_1.Controller)('auth/forgot-password'),
    __metadata("design:paramtypes", [forgot_password_service_1.ForgotPasswordService,
        forgot_password_email_service_1.ForgotPasswordEmailService,
        forgot_password_links_service_1.ForgotPasswordLinksService,
        entry_service_1.EntryService,
        firebase_auth_service_1.FirebaseAuthService,
        account_confirmation_service_1.AccountConfirmationService])
], ForgotPasswordController);
exports.ForgotPasswordController = ForgotPasswordController;
//# sourceMappingURL=forgot-password.controller.js.map