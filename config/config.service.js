"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const dotenv_1 = require("dotenv");
class ConfigService {
    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== "Prodution";
        if (isDevelopmentEnv) {
            const envFilePath = __dirname + '/../../.env';
            const existsPath = fs.existsSync(envFilePath);
            if (!existsPath) {
                console.log('.env not exists');
                process.exit;
            }
            this.envConfig = dotenv_1.parse(fs.readFileSync(envFilePath));
        }
        else {
            this.envConfig = { PORT: process.env.PORT };
        }
    }
    get(key) {
        return this.envConfig[key];
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map