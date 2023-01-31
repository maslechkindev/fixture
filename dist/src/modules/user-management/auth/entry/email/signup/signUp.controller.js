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
exports.SignUpController = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const decorators_1 = require("../../../../../../helpers/swagger/decorators");
const firebase_auth_service_1 = require("../../../firebase/firebase.auth.service");
const entry_service_1 = require("../../entry.service");
const signUp_service_1 = require("./signUp.service");
const dto_1 = require("./dto");
const user_decorator_1 = require("../../../../../../decorators/user.decorator");
const user_interface_1 = require("../../../../../../interfaces/user.interface");
const account_confirmation_service_1 = require("../../../user-activity-links/account-confirmation/account-confirmation.service");
const errors_1 = require("../../../../../../helpers/errors");
const helpers_1 = require("../../../helpers");
const userStatus_1 = require("../../../../../../enums/userStatus");
const entryResponse_dto_1 = require("../../facebook/dto/entryResponse.dto");
const config_1 = require("../../../../../../config");
const entry_maps_1 = require("../../entry.maps");
let SignUpController = class SignUpController {
    constructor(entryService, signUpService, firebaseAuthService, accountConfirmationService) {
        this.entryService = entryService;
        this.signUpService = signUpService;
        this.firebaseAuthService = firebaseAuthService;
        this.accountConfirmationService = accountConfirmationService;
    }
    async signUpWithEmail(createUserDto) {
        var _a, _b;
        const isUsed = await this.entryService.isEmailUsed(createUserDto.email);
        if (isUsed) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_USED);
        }
        const { email, password, dateOfBirth, code, country, state } = createUserDto;
        const date = new Date();
        const parsedDateOfBirthWithTZ = (0, date_fns_1.parse)(dateOfBirth, 'MM/dd/yyyy', date);
        const parsedDateOfBirth = (0, date_fns_1.add)(parsedDateOfBirthWithTZ, {
            minutes: -date.getTimezoneOffset(),
        });
        const userAge = (0, date_fns_1.differenceInYears)(new Date(), parsedDateOfBirth);
        if (userAge < 18) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INVALID_DATE);
        }
        if (!((_b = (_a = entry_maps_1.userLocation === null || entry_maps_1.userLocation === void 0 ? void 0 : entry_maps_1.userLocation[country]) === null || _a === void 0 ? void 0 : _a[state]) === null || _b === void 0 ? void 0 : _b.allowed)) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INVALID_STATE);
        }
        if (code) {
            const isValid = await this.entryService.isValidReferralCode(code);
            if (!isValid) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.UNKNOWN_REFERRAL_CODE);
            }
        }
        const createUserData = {
            email,
            password,
            dateOfBirth: parsedDateOfBirth,
            country,
            state,
        };
        const newUser = await this.signUpService.saveUser(createUserData, code);
        const token = await this.accountConfirmationService.createAndSetEmailVerificationToken(newUser.email);
        await this.accountConfirmationService.sendConfirmationEmail(newUser.email, token, config_1.default.EXPIRATIONS.CONFIRMATION_EMAIL
            .ACCOUNT_CONFIRMATION_EMAIL_TEMPLATE_ID);
        return {
            email: newUser.email,
        };
    }
    async getLocations() {
        return entry_maps_1.userLocation;
    }
    async resendEmailVerificationLink(body, ip) {
        const { email } = body;
        const minutesBlocked = await this.accountConfirmationService.isBlockedToResendConfirmationLink(email, ip);
        if (minutesBlocked) {
            throw new errors_1.TooManyRequestsExceptionCustom(Object.assign(Object.assign({}, errors_1.ERRORS.TOO_MANY_REQUESTS), { info: { minutesBlocked: minutesBlocked } }));
        }
        const token = await this.accountConfirmationService.createAndSetEmailVerificationToken(email, ip);
        const user = await this.entryService.getUserByEmail(email);
        if (!user) {
            return {
                success: true,
            };
        }
        if (user.status === userStatus_1.userStatus.CONFIRMED) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.ACCOUNT_ALREADY_CONFIRMED);
        }
        await this.accountConfirmationService.sendConfirmationEmail(email, token, config_1.default.EXPIRATIONS.CONFIRMATION_EMAIL
            .ACCOUNT_CONFIRMATION_EMAIL_TEMPLATE_ID);
        return { success: true };
    }
    async verifyAccountEmailAddress(req, body) {
        const authToken = (0, helpers_1.extractToken)(req);
        const { token } = body;
        const tokenData = await this.accountConfirmationService.getVerifyAccountEmailTokenData(token);
        if (!tokenData) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.INVALID_TOKEN);
        }
        if (tokenData.status === userStatus_1.userStatus.CONFIRMED) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.ACCOUNT_ALREADY_CONFIRMED);
        }
        const { email } = tokenData;
        const lastValidTokenData = await this.accountConfirmationService.getLastValidTokenByEmail(email);
        if (!lastValidTokenData || lastValidTokenData.token !== tokenData.token) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.INVALID_TOKEN);
        }
        if (authToken) {
            const fireBaseUserData = await this.firebaseAuthService.verifyIdToken(authToken);
            if (fireBaseUserData && fireBaseUserData.userId !== tokenData.id) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.WRONG_USER);
            }
        }
        const updatedUser = await this.entryService.updateUserDataAfterAccountConfirmation(email);
        await this.accountConfirmationService.deleteUserConfirmationEmailTokens(email);
        const customToken = await this.firebaseAuthService.issueCustomToken(updatedUser.id);
        return {
            email,
            customToken: customToken,
        };
    }
    async getUserCustomToken(user) {
        const customToken = await this.firebaseAuthService.issueCustomToken(user.id);
        return {
            customToken,
        };
    }
};
__decorate([
    (0, decorators_1.ApiResponse)({
        status: 201,
        schema: {
            example: {
                email: 'test@test.com',
            },
        },
        description: 'Success registration via email. Returns the user email.',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.UNKNOWN_REFERRAL_CODE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_INVALID).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PASSWORD_INVALID).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_USED).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INVALID_DATE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_DATE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_STATE).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_COUNTRY).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INVALID_STATE).getResponse(),
                },
            ],
        },
        description: 'Error when incorrect email, password or email already used',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], SignUpController.prototype, "signUpWithEmail", null);
__decorate([
    (0, decorators_1.ApiResponse)({
        status: 200,
        schema: {
            example: entry_maps_1.userLocation,
        },
        description: 'Get user locations',
    }),
    (0, common_1.Get)('/locations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SignUpController.prototype, "getLocations", null);
__decorate([
    (0, decorators_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                success: true,
            },
        },
        description: 'Resend email verification link',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.ACCOUNT_ALREADY_CONFIRMED).getResponse(),
        },
        description: 'Error when account already confirmed',
    }),
    (0, decorators_1.ApiTooManyRequestsResponse)({
        schema: {
            example: new errors_1.TooManyRequestsExceptionCustom(errors_1.ERRORS.TOO_MANY_REQUESTS).getResponse(),
            description: 'Too many requests',
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/resend-verification-link'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResendEmailConfirmationLinkDto, String]),
    __metadata("design:returntype", Promise)
], SignUpController.prototype, "resendEmailVerificationLink", null);
__decorate([
    (0, decorators_1.ApiCreatedResponse)({
        type: entryResponse_dto_1.WrappedEntryResponseDTO,
        description: 'Account confirmed successfully',
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
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.ACCOUNT_ALREADY_CONFIRMED).getResponse(),
                },
            ],
        },
        description: 'Error when link not valid, link used, or link belongs to different user',
    }),
    (0, common_1.Post)('/verify-account-email'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.VerifyAccountEmailDto]),
    __metadata("design:returntype", Promise)
], SignUpController.prototype, "verifyAccountEmailAddress", null);
__decorate([
    (0, decorators_1.ApiBearerAuth)(),
    (0, decorators_1.ApiOkResponse)({
        status: 200,
        schema: {
            example: {
                customToken: '',
            },
        },
        description: 'Get user custom token',
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
    (0, common_1.Get)('/custom-token'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SignUpController.prototype, "getUserCustomToken", null);
SignUpController = __decorate([
    (0, decorators_1.ApiTags)('Signup'),
    (0, common_1.Controller)('auth/signup'),
    __param(2, (0, common_1.Inject)(firebase_auth_service_1.FirebaseAuthService)),
    __metadata("design:paramtypes", [entry_service_1.EntryService,
        signUp_service_1.SignUpService,
        firebase_auth_service_1.FirebaseAuthService,
        account_confirmation_service_1.AccountConfirmationService])
], SignUpController);
exports.SignUpController = SignUpController;
//# sourceMappingURL=signUp.controller.js.map