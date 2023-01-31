import { Config } from './interfaces';
import { getEnvVar } from './helpers';
import { SUBSCRIPTION } from '../modules/integrations/gcp-pubsub/enums/subscription';

export default {
  VERSION: process.env.npm_package_version,
  API: {
    PORT: getEnvVar('API_PORT', 3000),
  },
  DATABASE: {
    HOST: getEnvVar('DATABASE_HOST', '127.0.0.1'),
    PORT: getEnvVar('DATABASE_PORT', 5432),
    USER: getEnvVar('DATABASE_USER', 'postgres'),
    PASSWORD: getEnvVar('DATABASE_PASSWORD'),
    DATABASE: getEnvVar('DATABASE_DATABASE'),
    POOL: {
      MIN: Number(getEnvVar('DATABASE_POOL_MIN') || 5),
      MAX: Number(getEnvVar('DATABASE_POOL_MAX') || 30),
    },
  },
  LINK_PREFIX: getEnvVar('LINK_PREFIX'),
  FIREBASE: {
    CERT: getEnvVar('FIREBASE_CERT'),
    DATABASE_URL: getEnvVar('FIREBASE_DATABASE_URL'),
    WEB_API_KEY: getEnvVar('FIREBASE_WEB_API_KEY'),
    DYNAMIC_LINKS: {
      DOMAIN_URI_PREFIX: getEnvVar('DOMAIN_URI_PREFIX'),
      ANDROID_PACKAGE_NAME: getEnvVar('ANDROID_PACKAGE_NAME'),
      IOS_BUNDLE_ID: getEnvVar('IOS_BUNDLE_ID'),
      IOS_APP_STORE_ID: getEnvVar('IOS_APP_STORE_ID'),
    },
  },
  PUBSUB: {
    PROJECT_ID: getEnvVar('PUBSUB_PROJECT_ID'),
    CREDENTIALS: JSON.parse(getEnvVar('PUBSUB_CREDENTIALS') as string),
    SUBSCRIPTIONS: [
      {
        NAME: SUBSCRIPTION.CONSUMER,
        SUBSCRIPTION: getEnvVar('PUBSUB_CONSUMER_SUBSCRIPTION'),
      },
      {
        NAME: SUBSCRIPTION.CMS,
        SUBSCRIPTION: getEnvVar('PUBSUB_CMS_SUBSCRIPTION'),
      },
      {
        NAME: SUBSCRIPTION.PAYMENTS,
        SUBSCRIPTION: getEnvVar('PUBSUB_PAYMENTS_SUBSCRIPTION'),
      },
    ],
  },
  GOOGLE_CLOUD_STORAGE: {
    CREDENTIALS: JSON.parse(
      getEnvVar('GOOGLE_CLOUD_STORAGE_CREDENTIALS') as string,
    ),
    BUCKET: getEnvVar('GOOGLE_CLOUD_STORAGE_BUCKET'),
    PROJECT_ID: getEnvVar('GOOGLE_CLOUD_STORAGE_PROJECT_ID'),
  },
  SSO: {
    GOOGLE: {
      CLIENT_ID: getEnvVar('GOOGLE_SSO_CLIENT_ID'),
    },
    FACEBOOK: {
      FB_DEBUG_EP: getEnvVar('FB_DEBUG_EP'),
      FB_ACCESS_TOKEN: getEnvVar('FB_ACCESS_TOKEN'),
      FB_GRAPH_EP: getEnvVar('FB_GRAPH_EP'),
      FB_APP_ID: getEnvVar('FB_APP_ID'),
    },
    APPLE: {
      CLIENT_IDS: JSON.parse(getEnvVar('APPLE_SSO_CLIENT_IDS') as string),
      CLIENT_SECRET: getEnvVar('APPLE_SSO_CLIENT_SECRET'),
      APPLE_BASE_URL: 'https://appleid.apple.com',
      APPLE_JWKS: '/auth/keys',
      APPLE_AUTH_TOKEN: '/auth/token',
    },
  },
  MAILING: {
    SENDGRID: {
      TOKEN: getEnvVar('SENDGRID_TOKEN'),
      EMAIL: getEnvVar('SENDGRID_EMAIL'),
      NAME: getEnvVar('SENDGRID_NAME'),
      CONTACT_MANAGEMENT_ACTIVE:
        getEnvVar('SENDGRID_CONTACT_MANAGEMENT_ACTIVE') === 'true',
    },
    ETHEREAL: {
      IS_ACTIVE: getEnvVar('ETHEREAL_IS_ACTIVE') === 'true',
      USER: getEnvVar('ETHEREAL_USER'),
      PASS: getEnvVar('ETHEREAL_PASS'),
    },
  },
  EXPIRATIONS: {
    FORGOT_PASSWORD: {
      LINK_VALIDITY_MINUTES: getEnvVar(
        'FORGOT_PASSWORD_LINK_VALIDITY_MINUTES',
        60,
      ),
      BLOCKING_EMAILS_MINUTES: getEnvVar(
        'FORGOT_PASSWORD_BLOCKING_EMAILS_MINUTES',
        10,
      ),
    },
    CONFIRMATION_EMAIL: {
      LINK_VALIDITY_MINUTES: getEnvVar(
        'CONFIRMATION_EMAIL_LINK_VALIDITY_MINUTES',
        4320,
      ),
      BLOCKING_EMAILS_MINUTES: getEnvVar(
        'CONFIRMATION_EMAIL_BLOCKING_EMAILS_MINUTES',
        10,
      ),
      ACCOUNT_CONFIRMATION_EMAIL_TEMPLATE_ID: getEnvVar(
        'ACCOUNT_CONFIRMATION_EMAIL_TEMPLATE_ID',
      ),
      RESET_PASSWORD_CONFIRMATION_EMAIL_TEMPLATE_ID: getEnvVar(
        'RESET_PASSWORD_CONFIRMATION_EMAIL_TEMPLATE_ID',
      ),
      DOMAIN: getEnvVar('DOMAIN'),
    },
    PERSONAL_DETAILS: {
      USERNAME_EDITABLE_MINUTES: getEnvVar(
        'PERSONAL_DETAILS_USERNAME_EDITABLE_MINUTES',
        43200,
      ),
    },
    DELETE_INSTANCE: {
      TIMEOUT_MINUTES: getEnvVar(
        'DELETE_INSTANCE_TIMEOUT_MINUTES',
        8 * 24 * 60,
      ),
    },
  },
  FOLLOW_LIST: {
    DEFAULT_PAGE: getEnvVar('FOLLOW_LIST_PAGE_DEFAULT', 1),
    DEFAULT_LIMIT: getEnvVar('FOLLOW_LIST_LIMIT_DEFAULT', 10),
  },
  CMS: {
    CMS_BASE_URL: getEnvVar('CMS_BASE_URL'),
    CMS_SH_CONFIGURATIONS: getEnvVar('CMS_SH_CONFIGURATIONS'),
    CMS_PURCHASE_CARDS_PATH: getEnvVar('CMS_PURCHASE_CARDS_PATH'),
    CMS_PURCHASES_PATH: getEnvVar('CMS_PURCHASES_PATH'),
    CMS_CONTEST_TEMPLATE_PATH: getEnvVar('CMS_CONTEST_TEMPLATE_PATH'),
  },
  PAYMENTS_INFO: {
    STRIPE_API_KEY: getEnvVar('STRIPE_API_KEY'),
  },
  NOTIFICATIONS: {
    ENABLED: getEnvVar('NOTIFICATIONS_ENABLED') === 'true',
    PERSONAL_DETAILS: {
      USERNAME_CHANGE: {
        CRON_SETTINGS: getEnvVar(
          'NOTIFICATIONS_PERSONAL_DETAILS_USERNAME_CHANGE_CRON_SETTINGS',
        ),
        VALIDATION_PERIODS: JSON.parse(
          getEnvVar(
            'NOTIFICATIONS_PERSONAL_DETAILS_USERNAME_CHANGE_VALIDATION_PERIODS',
          ) as string,
        ),
      },
    },
    TEMPORARY_OUTCOME_CHANGED_PUSH_ENABLED:
      getEnvVar(`TEMPORARY_OUTCOME_CHANGED_PUSH_ENABLED`) === 'true',
    TESTING_ENABLED: getEnvVar('TESTING_PUSH_NOTIFICATIONS_ENABLED') === 'true',
  },
  GOOGLE_STORAGE_URL_PREFIX: getEnvVar('GOOGLE_STORAGE_URL_PREFIX'),
  SENTRY: {
    ON: getEnvVar('SENTRY_ON') === 'true',
    DSN: getEnvVar('SENTRY_DSN'),
    DEBUG: getEnvVar('SENTRY_DEBUG') === 'true',
  },
  SERVICE_ENV: getEnvVar('SERVICE_ENV'),
} as Config;
