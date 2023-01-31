"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMailingClient = void 0;
const mailing_service_1 = require("../services/mailing.service");
function createMailingClient(options) {
    const client = new mailing_service_1.MailingService(options);
    return client;
}
exports.createMailingClient = createMailingClient;
//# sourceMappingURL=mailing.util.js.map