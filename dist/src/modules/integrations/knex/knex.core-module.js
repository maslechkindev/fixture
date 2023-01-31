"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KnexCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnexCoreModule = void 0;
const common_1 = require("@nestjs/common");
const knex_utils_1 = require("./knex.utils");
let KnexCoreModule = KnexCoreModule_1 = class KnexCoreModule {
    static forRoot(options, connection) {
        const knexOptionsProvider = {
            provide: (0, knex_utils_1.getKnexOptionsToken)(connection),
            useValue: options,
        };
        const knexConnectionProvider = {
            provide: (0, knex_utils_1.getKnexConnectionToken)(connection),
            useValue: (0, knex_utils_1.createKnexConnection)(options),
        };
        return {
            module: KnexCoreModule_1,
            providers: [knexOptionsProvider, knexConnectionProvider],
            exports: [knexOptionsProvider, knexConnectionProvider],
        };
    }
    static forRootAsync(options, connection) {
        const knexConnectionProvider = {
            provide: (0, knex_utils_1.getKnexConnectionToken)(connection),
            useFactory(options) {
                return (0, knex_utils_1.createKnexConnection)(options);
            },
            inject: [(0, knex_utils_1.getKnexOptionsToken)(connection)],
        };
        return {
            module: KnexCoreModule_1,
            imports: options.imports,
            providers: [
                ...this.createAsyncProviders(options, connection),
                knexConnectionProvider,
            ],
            exports: [knexConnectionProvider],
        };
    }
    static createAsyncProviders(options, connection) {
        if (!(options.useExisting || options.useFactory || options.useClass)) {
            throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
        }
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options, connection)];
        }
        return [
            this.createAsyncOptionsProvider(options, connection),
            { provide: options.useClass, useClass: options.useClass },
        ];
    }
    static createAsyncOptionsProvider(options, connection) {
        if (!(options.useExisting || options.useFactory || options.useClass)) {
            throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
        }
        if (options.useFactory) {
            return {
                provide: (0, knex_utils_1.getKnexOptionsToken)(connection),
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: (0, knex_utils_1.getKnexOptionsToken)(connection),
            async useFactory(optionsFactory) {
                return optionsFactory.createKnexModuleOptions();
            },
            inject: [options.useClass || options.useExisting],
        };
    }
};
KnexCoreModule = KnexCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], KnexCoreModule);
exports.KnexCoreModule = KnexCoreModule;
//# sourceMappingURL=knex.core-module.js.map