"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var SentryLoggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryLoggerService = void 0;
const common_1 = require("@nestjs/common");
const Sentry = require("@sentry/node");
const integrations_1 = require("@sentry/integrations");
let SentryLoggerService = SentryLoggerService_1 = class SentryLoggerService extends common_1.ConsoleLogger {
    constructor(opts) {
        super();
        this.opts = opts;
        this.app = '[nest_logger]: ';
        if (!(opts && opts.dsn)) {
            return;
        }
        const { integrations = [] } = opts, sentryOptions = __rest(opts, ["integrations"]);
        this.levels = sentryOptions.logLevels;
        Sentry.init(Object.assign(Object.assign({}, sentryOptions), { integrations: [
                new Sentry.Integrations.OnUncaughtException({
                    onFatalError: async (err) => {
                        if (err.name === 'SentryError') {
                            console.log(err);
                        }
                        else {
                            Sentry.getCurrentHub().getClient().captureException(err);
                            process.exit(1);
                        }
                    },
                }),
                new Sentry.Integrations.OnUnhandledRejection({ mode: 'warn' }),
                new integrations_1.CaptureConsole({
                    levels: this.levels,
                }),
                ...integrations,
            ] }));
    }
    static SentryServiceInstance(opts) {
        if (!SentryLoggerService_1.serviceInstance) {
            SentryLoggerService_1.serviceInstance = new SentryLoggerService_1(opts);
        }
        return SentryLoggerService_1.serviceInstance;
    }
    log(message, context, asBreadcrumb) {
        message = `${this.app} ${message}`;
        try {
            super.log(message, context);
            if (this.levels.includes('log') === true) {
                asBreadcrumb
                    ? Sentry.addBreadcrumb({
                        message,
                        level: Sentry.Severity.Log,
                        data: {
                            context,
                        },
                    })
                    : Sentry.captureMessage(message, Sentry.Severity.Log);
            }
        }
        catch (err) { }
    }
    error(message, trace, context) {
        message = `${this.app} ${message}`;
        try {
            super.error(message, trace, context);
            if (this.levels.includes('error') === true) {
                Sentry.captureMessage(message, Sentry.Severity.Error);
            }
        }
        catch (err) { }
    }
    warn(message, context, asBreadcrumb) {
        message = `${this.app} ${message}`;
        try {
            super.warn(message, context);
            if (this.levels.includes('warn') === true) {
                asBreadcrumb
                    ? Sentry.addBreadcrumb({
                        message,
                        level: Sentry.Severity.Warning,
                        data: {
                            context,
                        },
                    })
                    : Sentry.captureMessage(message, Sentry.Severity.Warning);
            }
        }
        catch (err) { }
    }
    debug(message, context, asBreadcrumb) {
        message = `${this.app} ${message}`;
        try {
            super.debug(message, context);
            if (this.levels.includes('debug') === true) {
                asBreadcrumb
                    ? Sentry.addBreadcrumb({
                        message,
                        level: Sentry.Severity.Debug,
                        data: {
                            context,
                        },
                    })
                    : Sentry.captureMessage(message, Sentry.Severity.Debug);
            }
        }
        catch (err) { }
    }
    verbose(message, context, asBreadcrumb) {
        message = `${this.app} ${message}`;
        try {
            super.verbose(message, context);
            if (this.levels.includes('verbose') === true) {
                asBreadcrumb
                    ? Sentry.addBreadcrumb({
                        message,
                        level: Sentry.Severity.Info,
                        data: {
                            context,
                        },
                    })
                    : Sentry.captureMessage(message, Sentry.Severity.Info);
            }
        }
        catch (err) { }
    }
    instance() {
        return Sentry;
    }
    async onApplicationShutdown() {
        var _a, _b, _c;
        if (((_b = (_a = this.opts) === null || _a === void 0 ? void 0 : _a.close) === null || _b === void 0 ? void 0 : _b.enabled) === true) {
            await Sentry.close((_c = this.opts) === null || _c === void 0 ? void 0 : _c.close.timeout);
        }
    }
};
SentryLoggerService = SentryLoggerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], SentryLoggerService);
exports.SentryLoggerService = SentryLoggerService;
//# sourceMappingURL=sentry.service.js.map