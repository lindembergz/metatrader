"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("../config/config.module");
const config_service_1 = require("../config/config.service");
const config_key_1 = require("../config/config.key");
exports.databaseProviders = [
    typeorm_1.TypeOrmModule.forRootAsync({
        imports: [config_module_1.ConfigModule],
        inject: [config_service_1.ConfigService],
        async useFactory(config) {
            return {
                type: 'postgres',
                host: config.get(config_key_1.Configuration.HOST),
                username: config.get(config_key_1.Configuration.USERNAME),
                password: config.get(config_key_1.Configuration.PASSWORD),
                database: config.get(config_key_1.Configuration.DATABASE),
                port: 5432,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
            };
        },
    }),
];
//# sourceMappingURL=database.Service.js.map