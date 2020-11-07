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
let ClienteBanco = class ClienteBanco extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], ClienteBanco.prototype, "Id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 15 }),
    __metadata("design:type", String)
], ClienteBanco.prototype, "Nome", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 6 }),
    __metadata("design:type", String)
], ClienteBanco.prototype, "Agencia", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 8 }),
    __metadata("design:type", String)
], ClienteBanco.prototype, "Conta", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 10 }),
    __metadata("design:type", String)
], ClienteBanco.prototype, "TipoConta", void 0);
__decorate([
    typeorm_1.Column({ type: 'real', nullable: true, default: 0 }),
    __metadata("design:type", typeorm_1.Double)
], ClienteBanco.prototype, "AporteFinanceiro", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 15 }),
    __metadata("design:type", String)
], ClienteBanco.prototype, "TipoMoeda", void 0);
ClienteBanco = __decorate([
    typeorm_1.Entity('cliente_Bancos')
], ClienteBanco);
exports.ClienteBanco = ClienteBanco;
//# sourceMappingURL=cliente.Banco.entity.js.map