"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const firebase_admin_1 = require("firebase-admin");
const config_1 = require("../src/config");
const initializedDataBase = firebase_admin_1.default.apps.length < 1
    ? firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(JSON.parse(config_1.default.FIREBASE.CERT)),
        databaseURL: config_1.default.FIREBASE.DATABASE_URL,
    })
    : null;
async function up(knex) {
    const users = await knex('users').select('*');
    if (initializedDataBase) {
        const promises = users.map((user) => {
            return initializedDataBase
                .firestore()
                .collection('users')
                .doc(user.id)
                .set({ notificationsEnabled: user.notificationsEnabled }, { merge: true });
        });
        const response = await Promise.all(promises);
    }
}
exports.up = up;
async function down(knex) { }
exports.down = down;
//# sourceMappingURL=20220613095123_add_notifications_enabled_field.js.map