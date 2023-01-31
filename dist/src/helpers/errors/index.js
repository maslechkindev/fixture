"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundExceptionCustom = exports.BadRequestExceptionCustom = exports.UnauthorizedExceptionCustom = exports.TooManyRequestsExceptionCustom = exports.InternalError = exports.ERRORS = void 0;
const common_1 = require("@nestjs/common");
exports.ERRORS = {
    EMAIL_INVALID: {
        message: 'Please enter a valid email address',
        code: 'ERR-01',
    },
    PASSWORD_INVALID: {
        message: 'Password must contain 8 characters or more with at least 1 uppercase letter, 1 lowercase letter and 1 number',
        code: 'ERR-02',
    },
    INVALID_DATE: {
        message: 'Date of birth is invalid',
        code: 'ERR-49',
    },
    EMPTY_DATE: {
        message: 'Date of birth is empty',
        code: 'ERR-50',
    },
    EMPTY_COUNTRY: {
        message: 'Country is empty',
        code: 'ERR-51',
    },
    EMPTY_STATE: {
        message: 'State is empty',
        code: 'ERR-52',
    },
    INVALID_STATE: {
        message: 'Invalid State/Province',
        code: 'ERR-56',
    },
    EMAIL_USED: {
        code: 'ERR-03',
        message: 'An account with this email already exists',
    },
    UNKNOWN_REFERRAL_CODE: {
        code: 'ERR-05',
        message: 'The referral code that you entered is not valid. Please try again.',
    },
    INVALID_CREDENTIALS: {
        code: 'ERR-06',
        message: 'Email or password you entered is invalid',
    },
    MANUAL_LOGIN_DISABLED: {
        code: 'ERR-08',
        message: 'Your account has been blocked due to incorrect details being entered. To get access to your account, please reset your password',
    },
    TOO_MANY_REQUESTS: {
        code: 'ERR-09',
        message: 'Too Many Requests',
        info: { minutesBlocked: 0 },
    },
    ACCOUNT_ALREADY_CONFIRMED: {
        code: 'ERR-25',
        message: 'The email address associated with this account has already been confirmed. Please login using your email and password',
    },
    ACCOUNT_NOT_CONFIRMED: {
        code: 'ERR-301',
        message: 'Account not confirmed',
    },
    EMAIL_NOT_DERIVED: {
        code: 'ERR-302',
        message: 'Could not derive email from request',
    },
    PLATFORM_ID_NOT_DERIVED: {
        code: 'ERR-303',
        message: 'Could not derive platform id from request',
    },
    PLATFORM_TOKEN_EMPTY: {
        code: 'ERR-304',
        message: 'Platform token is empty',
    },
    ENTRY_NOT_UPDATED: {
        code: 'ERR-305',
        message: 'Entry not updated',
    },
    USER_BANNED: {
        code: 'ERR-27',
        message: 'Title: ACCOUNT BLOCKED\nText: Your account has been blocked. Please contact Support for more information.',
    },
    USER_EXClUDED: {
        code: 'ERR-60',
        message: 'Player excluded',
    },
    APPLE_SPECIFIC: {
        TOKEN_VALIDATION_ISS: {
            message: 'Access token validation failed: The iss does not match the Apple URL',
            code: 'ERR-001',
        },
        TOKEN_VALIDATION_AUD: {
            message: 'Access token validation failed: The aud parameter does not include this client',
            code: 'ERR-002',
        },
        TOKEN_VALIDATION_CLAIMS_TYPE: {
            message: 'Access token validation failed: Unhandled claims type',
            code: 'ERR-003',
        },
        TOKEN_VALIDATION_INVALID: {
            message: 'Access token validation failed: Invalid token',
            code: 'ERR-004',
        },
    },
    FACEBOOK_SPECIFIC: {
        TOKEN_VALIDATION_FAILED: {
            message: 'Access token validation failed: ',
            code: 'ERR-101',
            value: '',
        },
    },
    GOOGLE_SPECIFIC: {
        UNPROCESSABLE_TOKEN: {
            code: 'ERR-201',
            message: 'Access token validation failed',
        },
    },
    INTERNAL_SYSTEM_MSG: {
        INVALID_TOKEN: {
            code: 'INT-01',
            message: 'Link is not valid or expired',
        },
        WRONG_USER: {
            code: 'INT-02',
            message: 'Link is for different user',
        },
        ACCOUNT_ALREADY_CONFIRMED: {
            code: 'INT-03',
            message: 'Account already confirmed',
        },
        RESET_PASSWORD_LINK_NOT_VALID: {
            code: 'INT-04',
            message: 'Reset password link not valid',
        },
        CMS_INTEGRATION_ERROR: {
            code: 'INT-18',
            message: 'Error in cms integration',
        },
        FIRESTORE_INTEGRATION_ERROR: {
            code: 'INT-19',
            message: 'Error in firestore integration',
        },
    },
    FOLLOW_PLAYER: {
        USER_NOT_FOUND: {
            code: 'ERR-23',
            message: 'User not found',
        },
        FOLLOWING_LIST_EMPTY: {
            code: 'ERR-24',
            message: 'Following list empty',
        },
        FOLLOWERS_LIST_EMPTY: {
            code: 'INF-08',
            message: 'YOU DON`T HAVE  ANY FOLLOWERS  YET!',
        },
        FOLLOWERS_LIST_UNAVAILABLE: {
            code: 'INF-09',
            message: 'SORRY, THIS OPTION IS UNAVAILABLE.',
        },
        FOLLOW_YOURSELF: {
            code: 'INT-06',
            message: "Can't follow/unfollow yourself",
        },
        INVALID_FOLLOWING_ID: {
            code: 'INT-07',
            message: 'Invalid id provided',
        },
    },
    FORGOT_PASSWORD: {
        INVALID_TOKEN: {
            code: 'INT-01',
            message: 'Link is not valid or expired',
        },
        WRONG_USER: {
            code: 'INT-02',
            message: 'Link is for different user',
        },
        UNAUTHORIZED: {
            code: 'INT-07',
            message: 'Unauthorized',
        },
        USER_PREVIOUS_PASSWORD: {
            code: 'ERR-13',
            message: `Title: CHANGE NOT SUCCESSFUL\nText: Your new password needs to be different from your 2 previous passwords`,
        },
        ACCOUNT_NOT_CONFIRMED: {
            code: 'ERR-26',
            message: 'Please confirm your account to perform this action',
        },
    },
    CHANGE_PASSWORD: {
        USER_PREVIOUS_PASSWORD: {
            code: 'ERR-13',
            message: `Title: CHANGE NOT SUCCESSFUL\nText: Your new password needs to be different from your 2 previous passwords`,
        },
        PASSWORD_MATCHES: {
            code: 'ERR-14',
            message: 'Your new password matches your current password.  Please create a new password that is different than your current one',
        },
        INCORRECT_PASSWORD: {
            code: 'ERR-15',
            message: 'Your current password is not correct. Please try again',
        },
    },
    AUTH: {
        UNAUTHORIZED: {
            code: 'INT-08',
            message: 'Unauthorized',
        },
        NOT_LOGGED_IN: {
            code: 'INT-14',
            message: 'Not logged in',
        },
    },
    PERSONAL_DETAILS: {
        USERNAME_EXISTS: {
            code: 'ERR-17',
            message: 'The username that you entered already exists.  Please try again.',
        },
        INVALID_REFERAL_CODE: {
            code: 'ERR-50',
            message: 'Invalid referral code',
        },
        ONLY_LETTER_NUMBERS_ALLOWED: {
            code: 'ERR-18',
            message: 'Only letters and/or numbers are allowed.  Please try again.',
        },
        FIRST_NAME_TOO_LONG: {
            code: 'ERR-19',
            message: 'The firstName that you’ve entered is too long.  firstName must be between 2 and 36 characters long.  Please try again',
        },
        FIRST_NAME_TOO_SHORT: {
            code: 'ERR-20',
            message: 'The firstName that you’ve entered is too short.  firstName must be between 2 and 36 characters long.  Please try again',
        },
        LAST_NAME_TOO_LONG: {
            code: 'ERR-19',
            message: 'The lastName that you’ve entered is too long.  lastName must be between 2 and 36 characters long.  Please try again',
        },
        LAST_NAME_TOO_SHORT: {
            code: 'ERR-20',
            message: 'The lastName that you’ve entered is too short.  lastName must be between 2 and 36 characters long.  Please try again',
        },
        USERNAME_TOO_LONG: {
            code: 'ERR-19',
            message: 'The username that you’ve entered is too long.  Usernames must be between 2 and 36 characters long.  Please try again',
        },
        USERNAME_TOO_SHORT: {
            code: 'ERR-20',
            message: 'The username that you’ve entered is too short.  Usernames must be between 2 and 36 characters long.  Please try again',
        },
        CONTAINS_SPECIAL_SYMBOLS: {
            code: 'ERR-21',
            message: 'Value contains special symbols',
        },
        FIELD_EMPTY: {
            code: 'ERR-22',
            message: 'Field is empty',
        },
        INVALID_DATE: {
            code: 'INT-09',
            message: 'Invalid date format',
        },
        NOT_EDITABLE: {
            code: 'INT-10',
            message: 'Some of personal details fields (firstName, lastName, birthOfDate) are not editable',
        },
        USERNAME_NOT_EDITABLE: {
            code: 'INT-11',
            message: 'Username is not editable',
        },
        INVALID_ID: {
            code: 'INT-39',
            message: 'Invalid id provided',
        },
    },
    MANAGEMENT: {
        USER_NOT_FOUND: {
            code: 'ERR-23',
            message: 'User not found',
        },
        USERNAME_USED: {
            code: 'ERR-06',
            message: 'The username that you entered already exists.  Please try again',
        },
        REPLENISH_NOT_CONFIRMED_USER: {
            code: 'ERR-29',
            message: 'Cannot replenish balance of a non confirmed user',
        },
    },
    FIXTURE_MANAGEMENT: {
        FIXTURE_NOT_FOUND: {
            code: 'INT-32',
            message: 'Fixture not found',
        },
        FIXTURE_NOT_COMPLETE: {
            code: 'INT-33',
            message: 'Fixture not complete',
        },
        INVALID_CONTEST_TEMPLATE_IDS_PASSED: {
            code: 'INT-34',
            message: 'Invalid cms contest template ids passed',
        },
    },
    BALANCE: {
        NEGATIVE_BALANCE: {
            code: 'ERR-28',
            message: 'Negative balance after transaction',
        },
        NO_TRANSACTIONS_FOR_PERIOD: {
            code: 'INF-13',
            message: 'There are no transactions found for the specified period. Please try again',
        },
    },
    PURCHASE: {
        NOT_EXIST: {
            code: 'ERR-29',
            message: 'Purchase not exist',
        },
        NOT_LOGGED_IN: {
            code: 'INT-14',
            message: 'Not logged in',
        },
        MISSING_PERSONAL_DETAILS: (emptyFields) => ({
            code: 'INT-15',
            message: `Missing/incomplete personal details: ${emptyFields.join(', ')}`,
        }),
        INVALID_MONTH_NUMBER: {
            code: 'INT-28',
            message: 'Invalid month number',
        },
        INVALID_PURCHASE_ID: {
            code: 'INT-31',
            message: 'Invalid purchase id',
        },
    },
    CONTEST: {
        FORCE_BET_INVALID_WIN_AMOUNT: {
            code: 'INT-42',
            message: 'Invalid free win amount',
        },
        FORCE_BET_INVALID_BET_AMOUNT: {
            code: 'INT-43',
            message: 'Invalid free bet amount',
        },
        FORCE_BET_INVALID_MARKET_TYPE: {
            code: 'ERR-48',
            message: 'Invalid market type for force bet provided',
        },
        FORCE_BET_ATTEMPT_TO_BET_ALREADY_FORCED_MARKET: {
            code: 'INT-37',
            message: 'Free bet already placed for this market',
        },
        FORCE_BET_ATTEMPT_WITHOUT_FORCE_BET_RUNNING: {
            code: 'INT-47',
            message: 'Free bet not running',
        },
        NOT_ENOUGH_MONEY: {
            code: 'ERR-34',
            message: 'Not enough money',
        },
        NOT_AUTHORIZED_TO_ENTER: {
            code: 'ERR-35',
            message: 'Not authorized to enter',
        },
        CONTEST_INSTANCE_FULL: {
            code: 'ERR-36',
            message: 'Contest instance full',
        },
        ALREADY_REGISTERED_TO_CONTEST: {
            code: 'ERR-37',
            message: 'Sorry, we are unable to perform this action. You are already registered to this contest',
        },
        REGISTRATION_CLOSED: {
            code: 'ERR-38',
            message: 'Registration closed',
        },
        INVALID_CONTEST_INSTANCE_ID_PROVIDED: {
            code: 'INT-20',
            message: 'Invalid contest instance id provided',
        },
        INVALID_CONTEST_INSTANCE_STATUS_PROVIDED: {
            code: 'INT-22',
            message: 'Incorrect contest instance status provided ',
        },
        INVALID_FORMAT_OF_STATUSES_PASSED: {
            code: 'INT-23',
            message: 'Incorrect format of queryParameters passed ',
        },
        FIXTURE_ID_REQUIRED: {
            code: 'INT-21',
            message: 'fixtureId is required field',
        },
        INVALID_MARKET_LINE_ID_PROVIDED: {
            code: 'INT-24',
            message: 'Invalid marketLineId provided',
        },
        BET_AMOUNT_REQUIRED_POSITIVE: {
            code: 'INT-25',
            message: 'betAmount is required, positive number field',
        },
        NOT_PART_OF_CONTEST_INSTANCE_PARTICIPANTS: {
            code: 'ERR-39',
            message: 'Not part of contest instance participants',
        },
        NOT_REGISTERED_TO_CONTEST_INSTANCE: {
            code: 'INT-36',
            message: 'Not registered to contest instance',
        },
        CONTEST_INSTANCE_WITHDRAW_NOT_ALLOWED: {
            code: 'ERR-40',
            message: 'Withdraw is not allowed',
        },
        CONTEST_IS_NOT_LIVE: {
            code: 'ERR-41',
            message: 'Contest is not live',
        },
        MARKET_LINE_IS_NOT_AVAILABLE: {
            code: 'ERR-42',
            message: 'This market line is not available',
        },
        NOT_ENOUGH_BANKROLL_AMOUNT: {
            code: 'ERR-43',
            message: 'Not enough bankroll amount',
        },
        ODDS_REQUIRED: {
            code: 'INT-26',
            message: 'americanOdds is required field',
        },
        ODDS_HAS_CHANGED: {
            code: 'ERR-46',
            message: 'Odds has changed',
        },
        LOCKED_ODDS_DONT_MATCH: {
            code: 'ERR-57',
            message: 'Locked odds do not match',
        },
        WIN_AMOUNT_REQUIRED: {
            code: 'INT-29',
            message: 'winAMount is required field',
        },
        INVALID_WIN_AMOUNT: {
            code: 'INT-30',
            message: 'Invalid winAmount',
        },
        BET_AMOUNT_EXCEED_MAX_ALLOWED: {
            code: 'ERR-44',
            message: 'Bet amount exceed max allowed bet amount',
        },
        BET_AMOUNT_LESS_THAN_MIN_ALLOWED: {
            code: 'ERR-45',
            message: 'Bet amount less that min allowed bet amount',
        },
        WIN_AMOUNT_EXCEED_MAX_ALLOWED: {
            code: 'ERR-47',
            message: 'Win amount exceed max allowed win amount for that market',
        },
        UNAUTHORIZED_TO_VIEW_LEADERBOARD: {
            code: 'INT-41',
            message: 'Unauthorized to view leaderboard',
        },
        USER_ID_IS_NOT_PARTICIPANT: {
            code: 'INT-40',
            message: 'userId is not participant or not exist',
        },
    },
    LEADERBOARD_SHARING: {
        SHARING_NOT_ALLOWED_FOR_NOT_FINISHED_CONTEST: {
            code: 'INT-44',
            message: 'sharing is not allowed for not finished contest',
        },
        INVALID_CONTEST_INSTANCE_ID: {
            code: 'INT-45',
            message: 'invalid contest instance id',
        },
        UNAUTHORIZED_TO_SHARE_LEADERBOARD: {
            code: 'INT-46',
            message: 'Unauthorized to share leaderboard',
        },
    },
    NOTIFICATION: {
        USER_NOT_FOUND: {
            code: 'ERR-23',
            message: 'User not found',
        },
        USER_NOT_HAVE_NOTIFICATION_TOKENS: {
            code: 'INT-27',
            message: 'User does not have notification tokens',
        },
    },
    BETS: {
        NOT_ACCESSIBLE: {
            code: 'INT-47',
            message: 'Bets is not accessible',
        },
        USER_NOT_PARTICIPANT: {
            code: 'INT-40',
            message: 'userId not participant or not exist',
        },
    },
};
const transformErrorBody = (body, statusCode) => {
    if (Array.isArray(body)) {
        const response = {
            errorCodes: [],
            statusCode,
            messages: [],
            info: {},
        };
        body.reduce((a, e) => {
            if (e.code) {
                a.errorCodes.push(e.code);
            }
            if (e.message) {
                a.messages.push(e.message);
            }
            if (e.info && e.code) {
                a.info[e.code] = e.info;
            }
            return a;
        }, response);
        return response;
    }
    else {
        const result = {
            errorCodes: [body.code],
            statusCode,
            messages: [body.message],
        };
        if (body.info) {
            result.info = { [body.code]: body.info };
        }
        return result;
    }
};
class InternalError extends Error {
    constructor(body, message = '') {
        super(`[${body.code}]:${body.message}${body.info ? `(${JSON.stringify(body.info)})` : ''} ${message}`);
    }
}
exports.InternalError = InternalError;
class TooManyRequestsExceptionCustom extends common_1.HttpException {
    constructor(body) {
        super(transformErrorBody(body, 429), 429);
        Object.setPrototypeOf(this, TooManyRequestsExceptionCustom.prototype);
    }
}
exports.TooManyRequestsExceptionCustom = TooManyRequestsExceptionCustom;
class UnauthorizedExceptionCustom extends common_1.HttpException {
    constructor(body) {
        super(transformErrorBody(body, 401), 401);
        Object.setPrototypeOf(this, UnauthorizedExceptionCustom.prototype);
    }
}
exports.UnauthorizedExceptionCustom = UnauthorizedExceptionCustom;
class BadRequestExceptionCustom extends common_1.HttpException {
    constructor(body) {
        super(transformErrorBody(body, 400), 400);
        Object.setPrototypeOf(this, BadRequestExceptionCustom.prototype);
    }
}
exports.BadRequestExceptionCustom = BadRequestExceptionCustom;
class NotFoundExceptionCustom extends common_1.HttpException {
    constructor(body) {
        super(transformErrorBody(body, 404), 404);
    }
}
exports.NotFoundExceptionCustom = NotFoundExceptionCustom;
//# sourceMappingURL=index.js.map