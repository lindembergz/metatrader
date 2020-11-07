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
const cliente_repository_1 = require("./cliente.repository");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cliente_Endereco_entity_1 = require("./cliente.Endereco.entity");
const cliente_Conjuge_entity_1 = require("./cliente.Conjuge.entity");
const cliente_Banco_entity_1 = require("./cliente.Banco.entity");
const cliente_Documento_entity_1 = require("./cliente.Documento.entity");
let ClienteService = class ClienteService {
    constructor(_clienteRepository) {
        this._clienteRepository = _clienteRepository;
    }
    async get(id) {
        if (!id) {
            throw new common_1.BadRequestException('Id é requerido!');
        }
        const cliente = await this._clienteRepository.
            findOne(id, { where: { Status: 'Active' } });
        if (!cliente) {
            throw new common_1.BadRequestException('usuario nao existe!');
        }
        return cliente;
    }
    async getAll() {
        const clientes = await this._clienteRepository.find({ where: { Status: 'Active' } });
        return clientes;
    }
    async getView() {
        const entityManager = typeorm_2.getManager();
        const clientes = await entityManager.query('select * from "ClienteView"');
        return clientes;
    }
    async create(cliente) {
        const saveCliente = await this._clienteRepository.save(cliente);
        return saveCliente;
    }
    async update(id, cliente) {
        const repoEndereco = await typeorm_2.getConnection().getRepository(cliente_Endereco_entity_1.ClienteEndereco);
        repoEndereco.save(cliente.Endereco);
        const repoConjuge = await typeorm_2.getConnection().getRepository(cliente_Conjuge_entity_1.ClienteConjuge);
        repoConjuge.save(cliente.Conjuge);
        const repoBanco = await typeorm_2.getConnection().getRepository(cliente_Banco_entity_1.ClienteBanco);
        repoBanco.save(cliente.Banco);
        const repoDocumento = await typeorm_2.getConnection().getRepository(cliente_Documento_entity_1.ClienteDocumento);
        repoDocumento.save(cliente.Documento);
        await this._clienteRepository.update(id, cliente);
    }
    async delete(id) {
        const clienteExists = await this._clienteRepository.
            findOne(id, { where: { Status: 'Active' } });
        if (!clienteExists) {
            throw new common_1.BadRequestException('Cliente nao existe!');
        }
        await this._clienteRepository.delete(id);
    }
};
ClienteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(cliente_repository_1.ClienteRepository)),
    __metadata("design:paramtypes", [cliente_repository_1.ClienteRepository])
], ClienteService);
exports.ClienteService = ClienteService;
//# sourceMappingURL=cliente.service.js.map