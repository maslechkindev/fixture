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
exports.PersonalDetailsService = void 0;
const common_1 = require("@nestjs/common");
const personal_details_repository_1 = require("./personal-details.repository");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const user_interface_1 = require("../../../../interfaces/user.interface");
const R = require("ramda");
const userStatus_1 = require("../../../../enums/userStatus");
const registrationType_1 = require("../../../../enums/registrationType");
const errors_1 = require("../../../../helpers/errors");
const mailing_1 = require("../../../integrations/mailing");
let PersonalDetailsService = class PersonalDetailsService {
    constructor(personalDetailsRepository, transactionManager, mailingClient) {
        this.personalDetailsRepository = personalDetailsRepository;
        this.transactionManager = transactionManager;
        this.mailingClient = mailingClient;
    }
    getReferrerUsername(promoCode) {
        return this.personalDetailsRepository.getReferrerUsername(promoCode);
    }
    async checkIfFieldsEditable(personalDetails, user) {
        const firstNameNotEditable = user.firstName &&
            personalDetails.firstName &&
            user.firstName !== personalDetails.firstName;
        const lastNameNotEditable = user.lastName &&
            personalDetails.lastName &&
            user.lastName !== personalDetails.lastName;
        const dateOfBirthNotEditable = user.dateOfBirth &&
            personalDetails.dateOfBirth &&
            user.dateOfBirth.getTime() !==
                new Date(personalDetails.dateOfBirth).getTime();
        return !(firstNameNotEditable ||
            lastNameNotEditable ||
            dateOfBirthNotEditable);
    }
    convertPersonalDetailsInfo(personalDetails) {
        const update = {};
        if (personalDetails.firstName) {
            update.firstName = personalDetails.firstName;
        }
        if (personalDetails.lastName) {
            update.lastName = personalDetails.lastName;
        }
        if (personalDetails.dateOfBirth) {
            update.dateOfBirth = new Date(personalDetails.dateOfBirth);
        }
        return update;
    }
    async updateUserPersonalDetailsInfo(personalDetails, userId) {
        const fieldsToUpdate = this.convertPersonalDetailsInfo(personalDetails);
        if (Object.keys(fieldsToUpdate).length) {
            const txManager = await this.transactionManager.begin();
            try {
                const updatedUser = await this.personalDetailsRepository.updateUserPersonalDetailsInfo(txManager, fieldsToUpdate, userId);
                if (updatedUser.email) {
                    this.mailingClient.addUpdateContact(Object.assign({ email: updatedUser.email, dateOfBirth: updatedUser.dateOfBirth }, R.omit(['id', 'dateOfBirth', 'email'], updatedUser)));
                }
                await txManager.commit();
            }
            catch (err) {
                await txManager.rollback();
                throw err;
            }
        }
        return;
    }
    async getAccountType(userId) {
        const premiumInfo = await this.personalDetailsRepository.getPremiumRecordByUserId(userId);
        return !!premiumInfo ? userStatus_1.userAccountType.PREMIUM : userStatus_1.userAccountType.STANDARD;
    }
    getUserById(userId) {
        return this.personalDetailsRepository.getUserById(userId);
    }
    async getPersonalDetails(user) {
        const userData = R.pickAll([
            'id',
            'email',
            'status',
            'promoCode',
            'username',
            'avatar',
            'firstName',
            'lastName',
            'dateOfBirth',
            'confirmedAt',
            'referralLink',
            'country',
            'state',
        ], user);
        return Object.assign(Object.assign({}, userData), { accountType: await this.getAccountType(user.id), registrationType: await this.getRegistrationType(user.id), hasPassword: await this.getHasPassword(user.id, user.passwordHash) });
    }
    async getRegistrationType(userId) {
        const result = await this.personalDetailsRepository.isUserRegistrateBy3rdParty(userId);
        return result ? registrationType_1.registrationType.THIRD_PARTY : registrationType_1.registrationType.MANUAL;
    }
    async getHasPassword(userId, passwordHash) {
        const isUserRegisterBy3rdParty = await this.getRegistrationType(userId);
        return !(isUserRegisterBy3rdParty === registrationType_1.registrationType.THIRD_PARTY && !passwordHash);
    }
    async getFollowersListInfo(userId, listOfFollowers) {
        const [{ count }] = await this.personalDetailsRepository.checkIsAllFollowersValid(listOfFollowers);
        if (!Number(count) || Number(count) !== listOfFollowers.length) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.INVALID_FOLLOWING_ID);
        }
        const followingList = await this.personalDetailsRepository.isFollowed(userId, listOfFollowers);
        const userFollowingIds = followingList.map(({ followedUser }) => {
            return followedUser;
        });
        const result = listOfFollowers.reduce((prev, cur) => [...prev, { [cur]: userFollowingIds.includes(cur) }], []);
        return result;
    }
};
PersonalDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mailing_1.InjectMailing)()),
    __metadata("design:paramtypes", [personal_details_repository_1.PersonalDetailsRepository,
        transaction_manager_service_1.TransactionManager,
        mailing_1.MailingService])
], PersonalDetailsService);
exports.PersonalDetailsService = PersonalDetailsService;
//# sourceMappingURL=personal-details.service.js.map