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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const cliente_Endereco_entity_1 = require("./cliente.Endereco.entity");
const cliente_Conjuge_entity_1 = require("./cliente.Conjuge.entity");
const cliente_Banco_entity_1 = require("./cliente.Banco.entity");
const cliente_Documento_entity_1 = require("./cliente.Documento.entity");
let Cliente = class Cliente extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], Cliente.prototype, "Id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', unique: true, length: 50, nullable: false }),
    __metadata("design:type", String)
], Cliente.prototype, "Nome", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, default: 'Active', length: 10 }),
    __metadata("design:type", String)
], Cliente.prototype, "Status", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 40 }),
    __metadata("design:type", String)
], Cliente.prototype, "Email", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 30 }),
    __metadata("design:type", String)
], Cliente.prototype, "Celular", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Cliente.prototype, "DataNascimento", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 30 }),
    __metadata("design:type", String)
], Cliente.prototype, "Profissao", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 15 }),
    __metadata("design:type", String)
], Cliente.prototype, "Nacionalidade", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 14 }),
    __metadata("design:type", String)
], Cliente.prototype, "ResponsavelLegal", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "Login", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 8 }),
    __metadata("design:type", String)
], Cliente.prototype, "Senha", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 14 }),
    __metadata("design:type", String)
], Cliente.prototype, "EstadoCivil", void 0);
__decorate([
    typeorm_1.OneToOne(type => cliente_Endereco_entity_1.ClienteEndereco, { cascade: true, nullable: false, eager: true }),
    typeorm_1.JoinColumn({ name: 'Endereco_id' }),
    __metadata("design:type", cliente_Endereco_entity_1.ClienteEndereco)
], Cliente.prototype, "Endereco", void 0);
__decorate([
    typeorm_1.OneToOne(type => cliente_Documento_entity_1.ClienteDocumento, { cascade: true, nullable: false, eager: true }),
    typeorm_1.JoinColumn({ name: 'Documento_id' }),
    __metadata("design:type", cliente_Documento_entity_1.ClienteDocumento)
], Cliente.prototype, "Documento", void 0);
__decorate([
    typeorm_1.OneToOne(type => cliente_Conjuge_entity_1.ClienteConjuge, { cascade: true, nullable: false, eager: true }),
    typeorm_1.JoinColumn({ name: 'Conjuge_id' }),
    __metadata("design:type", cliente_Conjuge_entity_1.ClienteConjuge)
], Cliente.prototype, "Conjuge", void 0);
__decorate([
    typeorm_1.OneToOne(type => cliente_Banco_entity_1.ClienteBanco, { cascade: true, nullable: false, eager: true }),
    typeorm_1.JoinColumn({ name: 'Banco_id' }),
    __metadata("design:type", cliente_Banco_entity_1.ClienteBanco)
], Cliente.prototype, "Banco", void 0);
Cliente = __decorate([
    typeorm_1.Entity('clientes')
], Cliente);
exports.Cliente = Cliente;
//# sourceMappingURL=cliente.entity.js.map