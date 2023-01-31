import { SUBSCRIPTION } from 'modules/integrations/gcp-pubsub/enums/subscription';
export interface Config {
    VERSION: string;
    API: {
        PORT: string;
    };
    DATABASE: {
        HOST: string;
        PORT: number;
        USER: string;
        PASSWORD: string;
        DATABASE: string;
        POOL: {
            MIN: number;
            MAX: number;
        };
    };
    LINK_PREFIX: string;
    FIREBASE: {
        CERT: string;
        DATABASE_URL: string;
        WEB_API_KEY: string;
        DYNAMIC_LINKS: {
            DOMAIN_URI_PREFIX: string;
            ANDROID_PACKAGE_NAME: string;
            IOS_BUNDLE_ID: string;
            IOS_APP_STORE_ID: string;
        };
    };
    PUBSUB: {
        PROJECT_ID: string;
        CREDENTIALS: {
            type: string;
            private_key: string;
            client_email: string;
            client_id: string;
        };
        SUBSCRIPTIONS: Array<{
            NAME: SUBSCRIPTION;
            SUBSCRIPTION: string;
        }>;
    };
    GOOGLE_CLOUD_STORAGE: {
        CREDENTIALS: {
            type: string;
            private_key: string;
            client_email: string;
            client_id: string;
        };
        BUCKET: string;
        PROJECT_ID: string;
    };
    SSO: {
        GOOGLE: {
            CLIENT_ID: string;
        };
        FACEBOOK: {
            FB_DEBUG_EP: string;
            FB_ACCESS_TOKEN: string;
            FB_GRAPH_EP: string;
            FB_APP_ID: string;
        };
        APPLE: {
            CLIENT_IDS: Array<string>;
            CLIENT_SECRET: string;
            APPLE_BASE_URL: string;
            APPLE_JWKS: string;
            APPLE_AUTH_TOKEN: string;
        };
    };
    MAILING: {
        SENDGRID: {
            TOKEN: string;
            EMAIL: string;
            NAME: string;
            CONTACT_MANAGEMENT_ACTIVE: boolean;
        };
        ETHEREAL: {
            IS_ACTIVE: boolean;
            USER: string;
            PASS: string;
        };
    };
    EXPIRATIONS: {
        FORGOT_PASSWORD: {
            LINK_VALIDITY_MINUTES: number;
            BLOCKING_EMAILS_MINUTES: number;
        };
        CONFIRMATION_EMAIL: {
            LINK_VALIDITY_MINUTES: number;
            BLOCKING_EMAILS_MINUTES: number;
            ACCOUNT_CONFIRMATION_EMAIL_TEMPLATE_ID: string;
            RESET_PASSWORD_CONFIRMATION_EMAIL_TEMPLATE_ID: string;
        };
        PERSONAL_DETAILS: {
            USERNAME_EDITABLE_MINUTES: number;
        };
        DELETE_INSTANCE: {
            TIMEOUT_MINUTES: number;
        };
    };
    FOLLOW_LIST: {
        DEFAULT_PAGE: number;
        DEFAULT_LIMIT: number;
    };
    CMS: {
        CMS_BASE_URL: string;
        CMS_SH_CONFIGURATIONS: string;
        CMS_PURCHASE_CARDS_PATH: string;
        CMS_PURCHASES_PATH: string;
        CMS_CONTEST_TEMPLATE_PATH: string;
    };
    PAYMENTS_INFO: {
        STRIPE_API_KEY: string;
    };
    NOTIFICATIONS: {
        ENABLED: boolean;
        PERSONAL_DETAILS: {
            USERNAME_CHANGE: {
                CRON_SETTINGS: string;
                VALIDATION_PERIODS: Array<[number, number]>;
            };
        };
        TESTING_ENABLED: boolean;
        TEMPORARY_OUTCOME_CHANGED_PUSH_ENABLED: boolean;
    };
    GOOGLE_STORAGE_URL_PREFIX: string;
    SENTRY: {
        ON: boolean;
        DSN: string;
        DEBUG: boolean;
    };
    SERVICE_ENV: string;
}
