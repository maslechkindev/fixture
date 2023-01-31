"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATIONS = void 0;
const types_1 = require("../types");
const types_2 = require("../types");
const types_3 = require("./types");
const config_1 = require("../../../../../config");
const { GOOGLE_STORAGE_URL_PREFIX } = config_1.default;
const IMAGE_LOGO = `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/logo.png`;
exports.NOTIFICATIONS = {
    [types_3.NotificationEnumType.CHANGE_USERNAME_AND_GET_BONUS]: (messages) => ({
        notification: {
            title: 'CHANGE NICKNAME AND GET BONUS',
            body: `Create your own Nickname  until ${messages.beforeDate} and receive ${messages.reward} Coins. You may only change your Nickname one time.`,
        },
        data: {
            link: '/account/preview',
            buttonName: 'Change username',
            messageType: types_2.MessageType.CHANGE_USERNAME_AND_GET_BONUS,
            eventType: types_1.EventType.NOTIFICATION,
            imageLogo: IMAGE_LOGO,
            iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/System_circle_gray.png`,
            iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/System_circle_white.png`,
        },
        webpush: {
            fcmOptions: {
                link: '/account/preview',
            },
        },
    }),
    [types_3.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_IN_QUEUE]: (message) => ({
        notification: {
            title: 'CONTEST IS FULL',
            body: `${message.contestName} - ${message.fixtureName}\nPlease check contest details for start time.`,
        },
        data: {
            link: `/contest/details/${message.contestId}/${message.contestInstanceId}`,
            buttonName: 'Go to Contest',
            messageType: types_2.MessageType.CHANGE_CONTEST_INSTANCE_STATUS,
            eventType: types_1.EventType.NOTIFICATION,
            imageLogo: IMAGE_LOGO,
            iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/megaphone_circle_gray.png`,
            iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/megaphone_circle_white.png`,
        },
        webpush: {
            fcmOptions: {
                link: `/contest/details/${message.contestId}/${message.contestInstanceId}`,
            },
        },
    }),
    [types_3.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_IN_PROGRESS]: (message) => ({
        notification: {
            title: 'CONTEST HAS STARTED!',
            body: `${message.contestName} - ${message.fixtureName}\nPredictions can be placed now. Good luck!`,
        },
        data: {
            link: `/contest/odds/${message.contestId}/${message.contestInstanceId}`,
            buttonName: 'Go to Contest',
            messageType: types_2.MessageType.CHANGE_CONTEST_INSTANCE_STATUS,
            eventType: types_1.EventType.NOTIFICATION,
            imageLogo: IMAGE_LOGO,
            iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/contest_circle_gray.png`,
            iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/contest_circle_white.png`,
        },
        webpush: {
            fcmOptions: {
                link: `/contest/odds/${message.contestId}/${message.contestInstanceId}`,
            },
        },
    }),
    [types_3.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_CANCELLED_DUE_TO_MIN_PARTICIPANTS_NOT_REACHED]: (message) => ({
        notification: {
            title: 'CONTEST CANCELLED',
            body: `${message.contestName} - ${message.fixtureName}\nMinimum number of players not met.  Please register for another contest.`,
        },
        data: {
            link: `/`,
            buttonName: 'Back to Home',
            messageType: types_2.MessageType.CHANGE_CONTEST_INSTANCE_STATUS,
            eventType: types_1.EventType.NOTIFICATION,
            imageLogo: IMAGE_LOGO,
            iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/Contest_cancelled_circle_gray.png`,
            iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/Contest_cancelled_circle_white.png`,
        },
        webpush: {
            fcmOptions: {
                link: `/`,
            },
        },
    }),
    [types_3.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_CANCELLED_MISSING_ACTIVE_MARKETS]: (message) => ({
        notification: {
            title: 'CONTEST CANCELLED',
            body: `${message.contestName} - ${message.fixtureName}\nThis contest has been cancelled due to an issue with our odds provider.  We apologize for the inconvenience.`,
        },
        data: {
            link: `/`,
            buttonName: 'Back to Home',
            messageType: types_2.MessageType.CHANGE_CONTEST_INSTANCE_STATUS,
            eventType: types_1.EventType.NOTIFICATION,
            imageLogo: IMAGE_LOGO,
            iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/Contest_cancelled_circle_gray.png`,
            iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/Contest_cancelled_circle_white.png`,
        },
        webpush: {
            fcmOptions: {
                link: `/`,
            },
        },
    }),
    [types_3.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_FINISHED]: (message) => ({
        notification: {
            title: 'CONTEST HAS FINISHED!',
            body: `${message.contestName} - ${message.fixtureName}\nPlease check the Leaderboard to see how you did.`,
        },
        data: {
            link: `/contest/odds/leaderboard/${message.contestId}/${message.contestInstanceId}/${message.userId}`,
            buttonName: 'VIEW LEADERBOARD',
            messageType: types_2.MessageType.CHANGE_CONTEST_INSTANCE_STATUS,
            eventType: types_1.EventType.NOTIFICATION,
            imageLogo: IMAGE_LOGO,
            iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/contest_circle_gray.png`,
            iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/contest_circle_white.png`,
        },
        webpush: {
            fcmOptions: {
                link: `/contest/odds/leaderboard/${message.contestId}/${message.contestInstanceId}/${message.userId}`,
            },
        },
    }),
    [types_3.NotificationEnumType.FREE_BET_START]: (message) => ({
        notification: {
            title: 'FREE BET TIME',
            body: `${message.contestName} - ${message.fixtureName}\nDon't miss the opportunity to increase your chances to win!`,
        },
        data: {
            link: `/contest/odds/${message.contestId}/${message.contestInstanceId}`,
            buttonName: 'Go to Contest',
            messageType: types_2.MessageType.CHANGE_CONTEST_INSTANCE_STATUS,
            eventType: types_1.EventType.NOTIFICATION,
            imageLogo: IMAGE_LOGO,
            iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/force_bet_circle_gray.png`,
            iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/force_bet_circle_white.png`,
        },
        webpush: {
            fcmOptions: {
                link: `/contest/odds/${message.contestId}/${message.contestInstanceId}`,
            },
        },
    }),
    [types_3.NotificationEnumType.OUTCOME_STATUS_CHANGED]: (message) => ({
        notification: {
            title: ' PREDICTION SETTLEMENT CHANGE',
            body: ` ${message.contestName} - ${message.fixtureName}\nThe outcome of prediction "${message.marketName} - ${message.lineName}" has changed.  Please check the contest to see if this had any impact on the result or contact support if you have any questions.`,
        },
        data: {
            link: `/contest/odds/predictions-history/${message.contestId}/${message.instanceId}/${message.userId}`,
            buttonName: `Open My Predictions`,
            messageType: types_2.MessageType.OUTCOME_CHANGED,
            eventType: types_1.EventType.NOTIFICATION,
            imageLogo: IMAGE_LOGO,
            iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/resettlement_gray.png`,
            iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/resettlement_white.png`,
        },
        webpush: {
            fcmOptions: {
                link: `/contest/odds/predictions-history/${message.contestId}/${message.instanceId}/${message.userId}`,
            },
        },
    }),
    [types_3.NotificationEnumType.OUTCOME_WON]: (message) => ({
        notification: {
            title: ' YOU WON!',
            body: `You won ${Number.isFinite(parseFloat(message.toWinAmount))
                ? parseFloat(message.toWinAmount).toFixed(2)
                : message.toWinAmount} in the ${message.contestName}`,
        },
        data: {
            link: `/contest/odds/predictions-history/${message.contestId}/${message.instanceId}/${message.userId}`,
            buttonName: `Open My bets`,
            messageType: types_2.MessageType.YOU_WON,
            eventType: types_1.EventType.NOTIFICATION,
            imageLogo: IMAGE_LOGO,
            iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/win_gray.png`,
            iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/win_white.png`,
        },
        webpush: {
            fcmOptions: {
                link: `/contest/odds/predictions-history/${message.contestId}/${message.instanceId}/${message.userId}`,
            },
        },
    }),
    [types_3.NotificationEnumType.EXCLUDED_FROM_THE_CONTEST]: (message) => ({
        notification: {
            title: 'EXCLUDED FROM THE CONTEST',
            body: `${message.contestName} - ${message.fixtureName}\nYou have been excluded from the contest. The reason is \"${message.reasonOfExclude}\". If you have any questions please contact us.`,
        },
        data: {
            link: `/`,
            buttonName: 'Back to Home',
            messageType: types_2.MessageType.EXCLUDED_FROM_CONTEST,
            eventType: types_1.EventType.NOTIFICATION,
            imageLogo: IMAGE_LOGO,
            iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/Contest_cancelled_circle_gray.png`,
            iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/Contest_cancelled_circle_white.png`,
        },
        webpush: {
            fcmOptions: {
                link: '/',
            },
        },
    }),
    [types_3.NotificationEnumType.CONTEST_CANCELLED_BY_ADMIN]: (message) => ({
        notification: {
            title: ` CONTEST CANCELLED`,
            body: `${message.contestName} - ${message.fixtureName}\nSH admin has cancelled the contest. If you have any questions please contact us.`,
        },
        data: {
            link: '/',
            messageType: types_2.MessageType.CONTEST_CANCELED_BY_ADMIM,
            buttonName: 'Back to Home',
            eventType: types_1.EventType.NOTIFICATION,
            imageLogo: IMAGE_LOGO,
            iconRead: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/Contest_cancelled_circle_gray.png`,
            iconUnread: `${GOOGLE_STORAGE_URL_PREFIX}/notification-icons/Contest_cancelled_circle_white.png`,
        },
        webpush: {
            fcmOptions: {
                link: '/',
            },
        },
    }),
};
//# sourceMappingURL=notifications.map.js.map