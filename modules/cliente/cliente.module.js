"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cliente_repository_1 = require("./cliente.repository");
const cliente_service_1 = require("./cliente.service");
const cliente_Controller_1 = require("./cliente.Controller");
const shared_modules_1 = require("../../shared/shared.modules");
let ClienteModule = class ClienteModule {
};
ClienteModule = __decorate([
    common_1.Module({ imports: [
            typeorm_1.TypeOrmModule.forFeature([cliente_repository_1.ClienteRepository]),
            shared_modules_1.SharedModule,
        ],
        providers: [cliente_service_1.ClienteService,],
        controllers: [cliente_Controller_1.ClienteController,] })
], ClienteModule);
exports.ClienteModule = ClienteModule;
//# sourceMappingURL=cliente.module.js.map