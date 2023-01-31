"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const firebase_dynamic_links_1 = require("firebase-dynamic-links");
const config_1 = require("../src/config");
const { LINK_PREFIX, FIREBASE: { DYNAMIC_LINKS: { DOMAIN_URI_PREFIX, ANDROID_PACKAGE_NAME, IOS_BUNDLE_ID, IOS_APP_STORE_ID, }, WEB_API_KEY, }, } = config_1.default;
const firebaseDynamicLinksService = new firebase_dynamic_links_1.FirebaseDynamicLinks(WEB_API_KEY);
async function up(knex) {
    const [{ count }] = await knex('users').count('*');
    for (const iterator of Array.from(Array(Math.ceil(count / 200)), (_, i) => i)) {
        const users = await knex('users')
            .select('*')
            .orderBy('createdAt')
            .limit(200)
            .offset(iterator * 200)
            .where('promoCode', 'is not', null);
        await Promise.all(users.map(async (user) => {
            const { promoCode } = user;
            const referralFullLink = `${LINK_PREFIX}auth/registration/preview?referralCode=${promoCode}`;
            const { shortLink } = await firebaseDynamicLinksService.createLink({
                dynamicLinkInfo: {
                    domainUriPrefix: DOMAIN_URI_PREFIX,
                    link: referralFullLink,
                    androidInfo: {
                        androidPackageName: ANDROID_PACKAGE_NAME,
                    },
                    iosInfo: {
                        iosBundleId: IOS_BUNDLE_ID,
                        iosAppStoreId: IOS_APP_STORE_ID,
                    },
                },
            });
            await knex('users')
                .update({ referralLink: shortLink })
                .where({ promoCode });
        }));
        await new Promise((resolve) => setTimeout(() => resolve(), 1000 * 60));
    }
}
exports.up = up;
async function down() {
    return undefined;
}
exports.down = down;
//# sourceMappingURL=20221114144354_referrallink_update.js.map