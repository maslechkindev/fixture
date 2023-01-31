"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["CHANGE_USERNAME_AND_GET_BONUS"] = "changeUsernameAndGetBonus";
    MessageType["EXCLUDED_FROM_CONTEST"] = "excludedFromContest";
    MessageType["CHANGE_CONTEST_INSTANCE_STATUS"] = "changeContestInstanceStatus";
    MessageType["OUTCOME_CHANGED"] = "outcomeChanged";
    MessageType["YOU_WON"] = "youWon";
    MessageType["CONTEST_CANCELED_BY_ADMIM"] = "adminCancelledContest";
    MessageType["PASSWORD_CHANGE"] = "passwordChange";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var EventType;
(function (EventType) {
    EventType["NOTIFICATION"] = "NOTIFICATION";
    EventType["DATA_MESSAGE"] = "DATA_MESSAGE";
})(EventType = exports.EventType || (exports.EventType = {}));
//# sourceMappingURL=types.js.map