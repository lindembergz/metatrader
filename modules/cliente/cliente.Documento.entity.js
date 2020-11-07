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
let ClienteDocumento = class ClienteDocumento extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], ClienteDocumento.prototype, "Id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 15 }),
    __metadata("design:type", String)
], ClienteDocumento.prototype, "CPF", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 10 }),
    __metadata("design:type", String)
], ClienteDocumento.prototype, "RG", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ClienteDocumento.prototype, "DataEmissaoRG", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: 15 }),
    __metadata("design:type", String)
], ClienteDocumento.prototype, "OrgaoExpeditorRG", void 0);
ClienteDocumento = __decorate([
    typeorm_1.Entity('cliente_Documentos')
], ClienteDocumento);
exports.ClienteDocumento = ClienteDocumento;
//# sourceMappingURL=cliente.Documento.entity.js.map