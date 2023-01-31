"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const subscription_1 = require("../modules/integrations/gcp-pubsub/enums/subscription");
exports.default = {
    VERSION: process.env.npm_package_version,
    API: {
        PORT: (0, helpers_1.getEnvVar)('API_PORT', 3000),
    },
    DATABASE: {
        HOST: (0, helpers_1.getEnvVar)('DATABASE_HOST', '127.0.0.1'),
        PORT: (0, helpers_1.getEnvVar)('DATABASE_PORT', 5432),
        USER: (0, helpers_1.getEnvVar)('DATABASE_USER', 'postgres'),
        PASSWORD: (0, helpers_1.getEnvVar)('DATABASE_PASSWORD'),
        DATABASE: (0, helpers_1.getEnvVar)('DATABASE_DATABASE'),
        POOL: {
            MIN: Number((0, helpers_1.getEnvVar)('DATABASE_POOL_MIN') || 5),
            MAX: Number((0, helpers_1.getEnvVar)('DATABASE_POOL_MAX') || 30),
        },
    },
    LINK_PREFIX: (0, helpers_1.getEnvVar)('LINK_PREFIX'),
    FIREBASE: {
        CERT: (0, helpers_1.getEnvVar)('FIREBASE_CERT'),
        DATABASE_URL: (0, helpers_1.getEnvVar)('FIREBASE_DATABASE_URL'),
        WEB_API_KEY: (0, helpers_1.getEnvVar)('FIREBASE_WEB_API_KEY'),
        DYNAMIC_LINKS: {
            DOMAIN_URI_PREFIX: (0, helpers_1.getEnvVar)('DOMAIN_URI_PREFIX'),
            ANDROID_PACKAGE_NAME: (0, helpers_1.getEnvVar)('ANDROID_PACKAGE_NAME'),
            IOS_BUNDLE_ID: (0, helpers_1.getEnvVar)('IOS_BUNDLE_ID'),
            IOS_APP_STORE_ID: (0, helpers_1.getEnvVar)('IOS_APP_STORE_ID'),
        },
    },
    PUBSUB: {
        PROJECT_ID: (0, helpers_1.getEnvVar)('PUBSUB_PROJECT_ID'),
        CREDENTIALS: JSON.parse((0, helpers_1.getEnvVar)('PUBSUB_CREDENTIALS')),
        SUBSCRIPTIONS: [
            {
                NAME: subscription_1.SUBSCRIPTION.CONSUMER,
                SUBSCRIPTION: (0, helpers_1.getEnvVar)('PUBSUB_CONSUMER_SUBSCRIPTION'),
            },
            {
                NAME: subscription_1.SUBSCRIPTION.CMS,
                SUBSCRIPTION: (0, helpers_1.getEnvVar)('PUBSUB_CMS_SUBSCRIPTION'),
            },
            {
                NAME: subscription_1.SUBSCRIPTION.PAYMENTS,
                SUBSCRIPTION: (0, helpers_1.getEnvVar)('PUBSUB_PAYMENTS_SUBSCRIPTION'),
            },
        ],
    },
    GOOGLE_CLOUD_STORAGE: {
        CREDENTIALS: JSON.parse((0, helpers_1.getEnvVar)('GOOGLE_CLOUD_STORAGE_CREDENTIALS')),
        BUCKET: (0, helpers_1.getEnvVar)('GOOGLE_CLOUD_STORAGE_BUCKET'),
        PROJECT_ID: (0, helpers_1.getEnvVar)('GOOGLE_CLOUD_STORAGE_PROJECT_ID'),
    },
    SSO: {
        GOOGLE: {
            CLIENT_ID: (0, helpers_1.getEnvVar)('GOOGLE_SSO_CLIENT_ID'),
        },
        FACEBOOK: {
            FB_DEBUG_EP: (0, helpers_1.getEnvVar)('FB_DEBUG_EP'),
            FB_ACCESS_TOKEN: (0, helpers_1.getEnvVar)('FB_ACCESS_TOKEN'),
            FB_GRAPH_EP: (0, helpers_1.getEnvVar)('FB_GRAPH_EP'),
            FB_APP_ID: (0, helpers_1.getEnvVar)('FB_APP_ID'),
        },
        APPLE: {
            CLIENT_IDS: JSON.parse((0, helpers_1.getEnvVar)('APPLE_SSO_CLIENT_IDS')),
            CLIENT_SECRET: (0, helpers_1.getEnvVar)('APPLE_SSO_CLIENT_SECRET'),
            APPLE_BASE_URL: 'https://appleid.apple.com',
            APPLE_JWKS: '/auth/keys',
            APPLE_AUTH_TOKEN: '/auth/token',
        },
    },
    MAILING: {
        SENDGRID: {
            TOKEN: (0, helpers_1.getEnvVar)('SENDGRID_TOKEN'),
            EMAIL: (0, helpers_1.getEnvVar)('SENDGRID_EMAIL'),
            NAME: (0, helpers_1.getEnvVar)('SENDGRID_NAME'),
            CONTACT_MANAGEMENT_ACTIVE: (0, helpers_1.getEnvVar)('SENDGRID_CONTACT_MANAGEMENT_ACTIVE') === 'true',
        },
        ETHEREAL: {
            IS_ACTIVE: (0, helpers_1.getEnvVar)('ETHEREAL_IS_ACTIVE') === 'true',
            USER: (0, helpers_1.getEnvVar)('ETHEREAL_USER'),
            PASS: (0, helpers_1.getEnvVar)('ETHEREAL_PASS'),
        },
    },
    EXPIRATIONS: {
        FORGOT_PASSWORD: {
            LINK_VALIDITY_MINUTES: (0, helpers_1.getEnvVar)('FORGOT_PASSWORD_LINK_VALIDITY_MINUTES', 60),
            BLOCKING_EMAILS_MINUTES: (0, helpers_1.getEnvVar)('FORGOT_PASSWORD_BLOCKING_EMAILS_MINUTES', 10),
        },
        CONFIRMATION_EMAIL: {
            LINK_VALIDITY_MINUTES: (0, helpers_1.getEnvVar)('CONFIRMATION_EMAIL_LINK_VALIDITY_MINUTES', 4320),
            BLOCKING_EMAILS_MINUTES: (0, helpers_1.getEnvVar)('CONFIRMATION_EMAIL_BLOCKING_EMAILS_MINUTES', 10),
            ACCOUNT_CONFIRMATION_EMAIL_TEMPLATE_ID: (0, helpers_1.getEnvVar)('ACCOUNT_CONFIRMATION_EMAIL_TEMPLATE_ID'),
            RESET_PASSWORD_CONFIRMATION_EMAIL_TEMPLATE_ID: (0, helpers_1.getEnvVar)('RESET_PASSWORD_CONFIRMATION_EMAIL_TEMPLATE_ID'),
            DOMAIN: (0, helpers_1.getEnvVar)('DOMAIN'),
        },
        PERSONAL_DETAILS: {
            USERNAME_EDITABLE_MINUTES: (0, helpers_1.getEnvVar)('PERSONAL_DETAILS_USERNAME_EDITABLE_MINUTES', 43200),
        },
        DELETE_INSTANCE: {
            TIMEOUT_MINUTES: (0, helpers_1.getEnvVar)('DELETE_INSTANCE_TIMEOUT_MINUTES', 8 * 24 * 60),
        },
    },
    FOLLOW_LIST: {
        DEFAULT_PAGE: (0, helpers_1.getEnvVar)('FOLLOW_LIST_PAGE_DEFAULT', 1),
        DEFAULT_LIMIT: (0, helpers_1.getEnvVar)('FOLLOW_LIST_LIMIT_DEFAULT', 10),
    },
    CMS: {
        CMS_BASE_URL: (0, helpers_1.getEnvVar)('CMS_BASE_URL'),
        CMS_SH_CONFIGURATIONS: (0, helpers_1.getEnvVar)('CMS_SH_CONFIGURATIONS'),
        CMS_PURCHASE_CARDS_PATH: (0, helpers_1.getEnvVar)('CMS_PURCHASE_CARDS_PATH'),
        CMS_PURCHASES_PATH: (0, helpers_1.getEnvVar)('CMS_PURCHASES_PATH'),
        CMS_CONTEST_TEMPLATE_PATH: (0, helpers_1.getEnvVar)('CMS_CONTEST_TEMPLATE_PATH'),
    },
    PAYMENTS_INFO: {
        STRIPE_API_KEY: (0, helpers_1.getEnvVar)('STRIPE_API_KEY'),
    },
    NOTIFICATIONS: {
        ENABLED: (0, helpers_1.getEnvVar)('NOTIFICATIONS_ENABLED') === 'true',
        PERSONAL_DETAILS: {
            USERNAME_CHANGE: {
                CRON_SETTINGS: (0, helpers_1.getEnvVar)('NOTIFICATIONS_PERSONAL_DETAILS_USERNAME_CHANGE_CRON_SETTINGS'),
                VALIDATION_PERIODS: JSON.parse((0, helpers_1.getEnvVar)('NOTIFICATIONS_PERSONAL_DETAILS_USERNAME_CHANGE_VALIDATION_PERIODS')),
            },
        },
        TEMPORARY_OUTCOME_CHANGED_PUSH_ENABLED: (0, helpers_1.getEnvVar)(`TEMPORARY_OUTCOME_CHANGED_PUSH_ENABLED`) === 'true',
        TESTING_ENABLED: (0, helpers_1.getEnvVar)('TESTING_PUSH_NOTIFICATIONS_ENABLED') === 'true',
    },
    GOOGLE_STORAGE_URL_PREFIX: (0, helpers_1.getEnvVar)('GOOGLE_STORAGE_URL_PREFIX'),
    SENTRY: {
        ON: (0, helpers_1.getEnvVar)('SENTRY_ON') === 'true',
        DSN: (0, helpers_1.getEnvVar)('SENTRY_DSN'),
        DEBUG: (0, helpers_1.getEnvVar)('SENTRY_DEBUG') === 'true',
    },
    SERVICE_ENV: (0, helpers_1.getEnvVar)('SERVICE_ENV'),
};
//# sourceMappingURL=config.js.map