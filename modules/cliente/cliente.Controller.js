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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("./cliente.service");
const cliente_entity_1 = require("./cliente.entity");
let ClienteController = class ClienteController {
    constructor(_clienteService) {
        this._clienteService = _clienteService;
    }
    async getCliente(id) {
        const cliente = await this._clienteService.get(id);
        return cliente;
    }
    async getClientes() {
        const clientes = await this._clienteService.getAll();
        return clientes;
    }
    async getClientesView() {
        const clientes = await this._clienteService.getView();
        return clientes;
    }
    async createCliente(cliente) {
        const clienteCreated = await this._clienteService.create(cliente);
        return clienteCreated;
    }
    async updateCliente(id, cliente) {
        await this._clienteService.update(id, cliente);
        return true;
    }
    async DeleteCliente(id) {
        await this._clienteService.delete(id);
        return true;
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "getCliente", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "getClientes", null);
__decorate([
    common_1.Get('view'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "getClientesView", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cliente_entity_1.Cliente]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "createCliente", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, cliente_entity_1.Cliente]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "updateCliente", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "DeleteCliente", null);
ClienteController = __decorate([
    common_1.Controller('clientes'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], ClienteController);
exports.ClienteController = ClienteController;
//# sourceMappingURL=cliente.Controller.js.map