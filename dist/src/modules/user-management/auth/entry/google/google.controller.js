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
exports.GoogleSSOController = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const decorators_1 = require("../../../../../helpers/swagger/decorators");
const entry_service_1 = require("../entry.service");
const firebase_auth_service_1 = require("../../firebase/firebase.auth.service");
const registrationSubType_1 = require("../../../../../enums/registrationSubType");
const google_service_1 = require("./google.service");
const verifyEmail_dto_1 = require("./dto/verifyEmail.dto");
const entry_dto_1 = require("./dto/entry.dto");
const errors_1 = require("../../../../../helpers/errors");
const tokenVerificationResponse_dto_1 = require("./dto/tokenVerificationResponse.dto");
const entryResponse_dto_1 = require("./dto/entryResponse.dto");
const user_interface_1 = require("../../../../../interfaces/user.interface");
const entry_helpers_1 = require("../helpers/entry.helpers");
const entry_maps_1 = require("../entry.maps");
let GoogleSSOController = class GoogleSSOController {
    constructor(entryService, googleSSOService, firebaseAuthService) {
        this.entryService = entryService;
        this.googleSSOService = googleSSOService;
        this.firebaseAuthService = firebaseAuthService;
    }
    async createUser(email, googleAccountId, referralCode, userData) {
        const isUsedEmail = await this.entryService.isEmailUsed(email);
        if (isUsedEmail) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_USED);
        }
        const { userId } = await this.googleSSOService.saveUserAndCreateAccount({ email }, { id: googleAccountId }, referralCode, userData);
        return userId;
    }
    async entry(req, body) {
        var _a, _b;
        const googleData = await this.googleSSOService.getInfoFromIdToken(body.token);
        const user = await this.googleSSOService.retrieveExistingUser(googleData.sub);
        if (user) {
            const isUserBanned = await this.entryService.isUserBanned(user.id);
            if (isUserBanned) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.USER_BANNED);
            }
            const result = {
                email: user.email,
                customToken: null,
                registrationType: registrationSubType_1.registrationSubType.GOOGLE,
            };
            if (this.entryService.userConfirmed(user)) {
                result.customToken = await this.firebaseAuthService.issueCustomToken(user.id);
            }
            req.res.status(common_1.HttpStatus.OK);
            return result;
        }
        if (!body.dateOfBirth) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_DATE);
        }
        if (!body.country) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_COUNTRY);
        }
        if (!body.state) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMPTY_STATE);
        }
        const date = new Date();
        const parsedDateOfBirthWithTZ = (0, date_fns_1.parse)(body.dateOfBirth, 'MM/dd/yyyy', date);
        const parsedDateOfBirth = (0, date_fns_1.add)(parsedDateOfBirthWithTZ, {
            minutes: -date.getTimezoneOffset(),
        });
        const userAge = (0, date_fns_1.differenceInYears)(new Date(), parsedDateOfBirth);
        if (userAge < 18) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INVALID_DATE);
        }
        if (!((_b = (_a = entry_maps_1.userLocation === null || entry_maps_1.userLocation === void 0 ? void 0 : entry_maps_1.userLocation[body.country]) === null || _a === void 0 ? void 0 : _a[body.state]) === null || _b === void 0 ? void 0 : _b.allowed)) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.INVALID_STATE);
        }
        if (body.code) {
            const isValid = await this.entryService.isValidReferralCode(body.code);
            if (!isValid) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.UNKNOWN_REFERRAL_CODE);
            }
        }
        const { email, sub: googleAccountId, given_name: firstName, family_name: lastName, } = googleData;
        const presettedData = {};
        if ((0, entry_helpers_1.isValidName)(firstName))
            presettedData.firstName = firstName;
        if ((0, entry_helpers_1.isValidName)(lastName))
            presettedData.lastName = lastName;
        presettedData.dateOfBirth = parsedDateOfBirth;
        presettedData.country = body.country;
        presettedData.state = body.state;
        const userId = await this.createUser(email, googleAccountId, body.code, presettedData);
        const customToken = await this.firebaseAuthService.issueCustomToken(userId);
        req.res.status(common_1.HttpStatus.CREATED);
        return {
            email,
            customToken,
            registrationType: registrationSubType_1.registrationSubType.GOOGLE,
        };
    }
    async verify(body) {
        const { email, sub } = await this.googleSSOService.getInfoFromIdToken(body.token);
        const googleAccount = await this.googleSSOService.getGoogleAccount(sub);
        if (googleAccount) {
            return {
                code: tokenVerificationResponse_dto_1.ResponseCode.NONE,
            };
        }
        const isEmailUsed = await this.entryService.isEmailUsed(email);
        if (isEmailUsed) {
            return {
                code: tokenVerificationResponse_dto_1.ResponseCode.USER_EXISTS,
            };
        }
        return {
            code: tokenVerificationResponse_dto_1.ResponseCode.GET_CODE,
        };
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: entryResponse_dto_1.WrappedEntryResponseDTO,
        description: 'Existing user retrieved',
    }),
    (0, decorators_1.ApiCreatedResponse)({
        type: entryResponse_dto_1.WrappedEntryResponseDTO,
        description: 'User created',
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
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PLATFORM_TOKEN_EMPTY).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.GOOGLE_SPECIFIC.UNPROCESSABLE_TOKEN).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.USER_BANNED).getResponse(),
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
            description: 'Email used in google account, but not used in the app',
        },
    }),
    (0, common_1.Post)('/entry'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, entry_dto_1.GoogleEntryDto]),
    __metadata("design:returntype", Promise)
], GoogleSSOController.prototype, "entry", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: tokenVerificationResponse_dto_1.WrappedTokenVerificationGetDTO,
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PLATFORM_TOKEN_EMPTY).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.GOOGLE_SPECIFIC.UNPROCESSABLE_TOKEN).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/verify/token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifyEmail_dto_1.GoogleVerifyEmailDto]),
    __metadata("design:returntype", Promise)
], GoogleSSOController.prototype, "verify", null);
GoogleSSOController = __decorate([
    (0, decorators_1.ApiTags)('SSO Google'),
    (0, common_1.Controller)('auth/sso/google'),
    __metadata("design:paramtypes", [entry_service_1.EntryService,
        google_service_1.GoogleSSOService,
        firebase_auth_service_1.FirebaseAuthService])
], GoogleSSOController);
exports.GoogleSSOController = GoogleSSOController;
//# sourceMappingURL=google.controller.js.map