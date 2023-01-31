import { HttpException } from '@nestjs/common';
export declare const ERRORS: {
    EMAIL_INVALID: {
        message: string;
        code: string;
    };
    PASSWORD_INVALID: {
        message: string;
        code: string;
    };
    INVALID_DATE: {
        message: string;
        code: string;
    };
    EMPTY_DATE: {
        message: string;
        code: string;
    };
    EMPTY_COUNTRY: {
        message: string;
        code: string;
    };
    EMPTY_STATE: {
        message: string;
        code: string;
    };
    INVALID_STATE: {
        message: string;
        code: string;
    };
    EMAIL_USED: {
        code: string;
        message: string;
    };
    UNKNOWN_REFERRAL_CODE: {
        code: string;
        message: string;
    };
    INVALID_CREDENTIALS: {
        code: string;
        message: string;
    };
    MANUAL_LOGIN_DISABLED: {
        code: string;
        message: string;
    };
    TOO_MANY_REQUESTS: {
        code: string;
        message: string;
        info: {
            minutesBlocked: number;
        };
    };
    ACCOUNT_ALREADY_CONFIRMED: {
        code: string;
        message: string;
    };
    ACCOUNT_NOT_CONFIRMED: {
        code: string;
        message: string;
    };
    EMAIL_NOT_DERIVED: {
        code: string;
        message: string;
    };
    PLATFORM_ID_NOT_DERIVED: {
        code: string;
        message: string;
    };
    PLATFORM_TOKEN_EMPTY: {
        code: string;
        message: string;
    };
    ENTRY_NOT_UPDATED: {
        code: string;
        message: string;
    };
    USER_BANNED: {
        code: string;
        message: string;
    };
    USER_EXClUDED: {
        code: string;
        message: string;
    };
    APPLE_SPECIFIC: {
        TOKEN_VALIDATION_ISS: {
            message: string;
            code: string;
        };
        TOKEN_VALIDATION_AUD: {
            message: string;
            code: string;
        };
        TOKEN_VALIDATION_CLAIMS_TYPE: {
            message: string;
            code: string;
        };
        TOKEN_VALIDATION_INVALID: {
            message: string;
            code: string;
        };
    };
    FACEBOOK_SPECIFIC: {
        TOKEN_VALIDATION_FAILED: {
            message: string;
            code: string;
            value: string;
        };
    };
    GOOGLE_SPECIFIC: {
        UNPROCESSABLE_TOKEN: {
            code: string;
            message: string;
        };
    };
    INTERNAL_SYSTEM_MSG: {
        INVALID_TOKEN: {
            code: string;
            message: string;
        };
        WRONG_USER: {
            code: string;
            message: string;
        };
        ACCOUNT_ALREADY_CONFIRMED: {
            code: string;
            message: string;
        };
        RESET_PASSWORD_LINK_NOT_VALID: {
            code: string;
            message: string;
        };
        CMS_INTEGRATION_ERROR: {
            code: string;
            message: string;
        };
        FIRESTORE_INTEGRATION_ERROR: {
            code: string;
            message: string;
        };
    };
    FOLLOW_PLAYER: {
        USER_NOT_FOUND: {
            code: string;
            message: string;
        };
        FOLLOWING_LIST_EMPTY: {
            code: string;
            message: string;
        };
        FOLLOWERS_LIST_EMPTY: {
            code: string;
            message: string;
        };
        FOLLOWERS_LIST_UNAVAILABLE: {
            code: string;
            message: string;
        };
        FOLLOW_YOURSELF: {
            code: string;
            message: string;
        };
        INVALID_FOLLOWING_ID: {
            code: string;
            message: string;
        };
    };
    FORGOT_PASSWORD: {
        INVALID_TOKEN: {
            code: string;
            message: string;
        };
        WRONG_USER: {
            code: string;
            message: string;
        };
        UNAUTHORIZED: {
            code: string;
            message: string;
        };
        USER_PREVIOUS_PASSWORD: {
            code: string;
            message: string;
        };
        ACCOUNT_NOT_CONFIRMED: {
            code: string;
            message: string;
        };
    };
    CHANGE_PASSWORD: {
        USER_PREVIOUS_PASSWORD: {
            code: string;
            message: string;
        };
        PASSWORD_MATCHES: {
            code: string;
            message: string;
        };
        INCORRECT_PASSWORD: {
            code: string;
            message: string;
        };
    };
    AUTH: {
        UNAUTHORIZED: {
            code: string;
            message: string;
        };
        NOT_LOGGED_IN: {
            code: string;
            message: string;
        };
    };
    PERSONAL_DETAILS: {
        USERNAME_EXISTS: {
            code: string;
            message: string;
        };
        INVALID_REFERAL_CODE: {
            code: string;
            message: string;
        };
        ONLY_LETTER_NUMBERS_ALLOWED: {
            code: string;
            message: string;
        };
        FIRST_NAME_TOO_LONG: {
            code: string;
            message: string;
        };
        FIRST_NAME_TOO_SHORT: {
            code: string;
            message: string;
        };
        LAST_NAME_TOO_LONG: {
            code: string;
            message: string;
        };
        LAST_NAME_TOO_SHORT: {
            code: string;
            message: string;
        };
        USERNAME_TOO_LONG: {
            code: string;
            message: string;
        };
        USERNAME_TOO_SHORT: {
            code: string;
            message: string;
        };
        CONTAINS_SPECIAL_SYMBOLS: {
            code: string;
            message: string;
        };
        FIELD_EMPTY: {
            code: string;
            message: string;
        };
        INVALID_DATE: {
            code: string;
            message: string;
        };
        NOT_EDITABLE: {
            code: string;
            message: string;
        };
        USERNAME_NOT_EDITABLE: {
            code: string;
            message: string;
        };
        INVALID_ID: {
            code: string;
            message: string;
        };
    };
    MANAGEMENT: {
        USER_NOT_FOUND: {
            code: string;
            message: string;
        };
        USERNAME_USED: {
            code: string;
            message: string;
        };
        REPLENISH_NOT_CONFIRMED_USER: {
            code: string;
            message: string;
        };
    };
    FIXTURE_MANAGEMENT: {
        FIXTURE_NOT_FOUND: {
            code: string;
            message: string;
        };
        FIXTURE_NOT_COMPLETE: {
            code: string;
            message: string;
        };
        INVALID_CONTEST_TEMPLATE_IDS_PASSED: {
            code: string;
            message: string;
        };
    };
    BALANCE: {
        NEGATIVE_BALANCE: {
            code: string;
            message: string;
        };
        NO_TRANSACTIONS_FOR_PERIOD: {
            code: string;
            message: string;
        };
    };
    PURCHASE: {
        NOT_EXIST: {
            code: string;
            message: string;
        };
        NOT_LOGGED_IN: {
            code: string;
            message: string;
        };
        MISSING_PERSONAL_DETAILS: (emptyFields: string[]) => {
            code: string;
            message: string;
        };
        INVALID_MONTH_NUMBER: {
            code: string;
            message: string;
        };
        INVALID_PURCHASE_ID: {
            code: string;
            message: string;
        };
    };
    CONTEST: {
        FORCE_BET_INVALID_WIN_AMOUNT: {
            code: string;
            message: string;
        };
        FORCE_BET_INVALID_BET_AMOUNT: {
            code: string;
            message: string;
        };
        FORCE_BET_INVALID_MARKET_TYPE: {
            code: string;
            message: string;
        };
        FORCE_BET_ATTEMPT_TO_BET_ALREADY_FORCED_MARKET: {
            code: string;
            message: string;
        };
        FORCE_BET_ATTEMPT_WITHOUT_FORCE_BET_RUNNING: {
            code: string;
            message: string;
        };
        NOT_ENOUGH_MONEY: {
            code: string;
            message: string;
        };
        NOT_AUTHORIZED_TO_ENTER: {
            code: string;
            message: string;
        };
        CONTEST_INSTANCE_FULL: {
            code: string;
            message: string;
        };
        ALREADY_REGISTERED_TO_CONTEST: {
            code: string;
            message: string;
        };
        REGISTRATION_CLOSED: {
            code: string;
            message: string;
        };
        INVALID_CONTEST_INSTANCE_ID_PROVIDED: {
            code: string;
            message: string;
        };
        INVALID_CONTEST_INSTANCE_STATUS_PROVIDED: {
            code: string;
            message: string;
        };
        INVALID_FORMAT_OF_STATUSES_PASSED: {
            code: string;
            message: string;
        };
        FIXTURE_ID_REQUIRED: {
            code: string;
            message: string;
        };
        INVALID_MARKET_LINE_ID_PROVIDED: {
            code: string;
            message: string;
        };
        BET_AMOUNT_REQUIRED_POSITIVE: {
            code: string;
            message: string;
        };
        NOT_PART_OF_CONTEST_INSTANCE_PARTICIPANTS: {
            code: string;
            message: string;
        };
        NOT_REGISTERED_TO_CONTEST_INSTANCE: {
            code: string;
            message: string;
        };
        CONTEST_INSTANCE_WITHDRAW_NOT_ALLOWED: {
            code: string;
            message: string;
        };
        CONTEST_IS_NOT_LIVE: {
            code: string;
            message: string;
        };
        MARKET_LINE_IS_NOT_AVAILABLE: {
            code: string;
            message: string;
        };
        NOT_ENOUGH_BANKROLL_AMOUNT: {
            code: string;
            message: string;
        };
        ODDS_REQUIRED: {
            code: string;
            message: string;
        };
        ODDS_HAS_CHANGED: {
            code: string;
            message: string;
        };
        LOCKED_ODDS_DONT_MATCH: {
            code: string;
            message: string;
        };
        WIN_AMOUNT_REQUIRED: {
            code: string;
            message: string;
        };
        INVALID_WIN_AMOUNT: {
            code: string;
            message: string;
        };
        BET_AMOUNT_EXCEED_MAX_ALLOWED: {
            code: string;
            message: string;
        };
        BET_AMOUNT_LESS_THAN_MIN_ALLOWED: {
            code: string;
            message: string;
        };
        WIN_AMOUNT_EXCEED_MAX_ALLOWED: {
            code: string;
            message: string;
        };
        UNAUTHORIZED_TO_VIEW_LEADERBOARD: {
            code: string;
            message: string;
        };
        USER_ID_IS_NOT_PARTICIPANT: {
            code: string;
            message: string;
        };
    };
    LEADERBOARD_SHARING: {
        SHARING_NOT_ALLOWED_FOR_NOT_FINISHED_CONTEST: {
            code: string;
            message: string;
        };
        INVALID_CONTEST_INSTANCE_ID: {
            code: string;
            message: string;
        };
        UNAUTHORIZED_TO_SHARE_LEADERBOARD: {
            code: string;
            message: string;
        };
    };
    NOTIFICATION: {
        USER_NOT_FOUND: {
            code: string;
            message: string;
        };
        USER_NOT_HAVE_NOTIFICATION_TOKENS: {
            code: string;
            message: string;
        };
    };
    BETS: {
        NOT_ACCESSIBLE: {
            code: string;
            message: string;
        };
        USER_NOT_PARTICIPANT: {
            code: string;
            message: string;
        };
    };
};
interface Info {
    [key: string]: string | number;
}
export interface ErrorResponse {
    errorCodes: string[];
    statusCode: number;
    messages: string[];
    info?: {
        [key: string]: Info;
    };
}
export declare class InternalError extends Error {
    constructor(body: {
        code: string;
        message: string;
        info?: Info;
    }, message?: string);
}
export declare class TooManyRequestsExceptionCustom extends HttpException {
    constructor(body: Array<{
        code: string;
        message: string;
        info?: Info;
    }> | {
        code: string;
        message: string;
        info?: Info;
    });
}
export interface ExceptionBody {
    code: string;
    message: string;
    info?: Info;
}
export declare type UnauthorizedExceptionBody = Array<ExceptionBody> | ExceptionBody;
export declare class UnauthorizedExceptionCustom extends HttpException {
    constructor(body: UnauthorizedExceptionBody);
}
export declare class BadRequestExceptionCustom extends HttpException {
    constructor(body: Array<{
        code: string;
        message: string;
    }> | {
        code: string;
        message: string;
    });
}
export declare class NotFoundExceptionCustom extends HttpException {
    constructor(body: Array<{
        code: string;
        message: string;
    }> | {
        code: string;
        message: string;
    });
}
export {};
