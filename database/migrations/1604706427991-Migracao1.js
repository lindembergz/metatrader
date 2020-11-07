"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Migracao11604706427991 {
    constructor() {
        this.name = 'Migracao11604706427991';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "cliente_Bancos" ("Id" SERIAL NOT NULL, "Nome" character varying(15), "Agencia" character varying(6), "Conta" character varying(8), "TipoConta" character varying(10), "AporteFinanceiro" real DEFAULT 0, "TipoMoeda" character varying(15), CONSTRAINT "PK_a2da553de86ca9d77b34d2469c7" PRIMARY KEY ("Id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "cliente_Conjuges" ("Id" SERIAL NOT NULL, "Nome" character varying(50), "CPF" character varying(14), "RG" character varying(10), "Celular" character varying(12), CONSTRAINT "PK_c68be97b0bba83cae65d2aab6bb" PRIMARY KEY ("Id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "cliente_Documentos" ("Id" SERIAL NOT NULL, "CPF" character varying(15), "RG" character varying(10), "DataEmissaoRG" date, "OrgaoExpeditorRG" character varying(15), CONSTRAINT "PK_8676ea7919d24c7be0eb0bffb03" PRIMARY KEY ("Id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "cliente_Enderecos" ("Id" SERIAL NOT NULL, "Logradouro" character varying(30), "Numero" character varying(5), "Bairro" character varying(15), "Municipio" character varying(15), "UF" character varying(2), "Cep" character varying(8), "Pais" character varying(10), CONSTRAINT "PK_cfc59891d6e7d49931a117a995e" PRIMARY KEY ("Id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "clientes" ("Id" SERIAL NOT NULL, "Nome" character varying(50) NOT NULL, "Status" character varying(10) DEFAULT 'Active', "Email" character varying(40), "Celular" character varying(30), "DataNascimento" date, "Profissao" character varying(30), "Nacionalidade" character varying(15), "ResponsavelLegal" character varying(14), "Login" character varying(20), "Senha" character varying(8), "EstadoCivil" character varying(14), "Endereco_id" integer NOT NULL, "Documento_id" integer NOT NULL, "Conjuge_id" integer NOT NULL, "Banco_id" integer NOT NULL, CONSTRAINT "UQ_c005501b094c2a9f255bbd6cfae" UNIQUE ("Nome"), CONSTRAINT "REL_e3254c72ac5e3fbb82565d3a8a" UNIQUE ("Endereco_id"), CONSTRAINT "REL_169183c31975c107ebd6bcc5a9" UNIQUE ("Documento_id"), CONSTRAINT "REL_a43676820de842c6e93047ba8e" UNIQUE ("Conjuge_id"), CONSTRAINT "REL_e9da98e93d90b185041db78469" UNIQUE ("Banco_id"), CONSTRAINT "PK_8867fe08929f19bd94dfe219fea" PRIMARY KEY ("Id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ADD CONSTRAINT "FK_e3254c72ac5e3fbb82565d3a8ae" FOREIGN KEY ("Endereco_id") REFERENCES "cliente_Enderecos"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ADD CONSTRAINT "FK_169183c31975c107ebd6bcc5a9c" FOREIGN KEY ("Documento_id") REFERENCES "cliente_Documentos"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ADD CONSTRAINT "FK_a43676820de842c6e93047ba8e6" FOREIGN KEY ("Conjuge_id") REFERENCES "cliente_Conjuges"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" ADD CONSTRAINT "FK_e9da98e93d90b185041db784694" FOREIGN KEY ("Banco_id") REFERENCES "cliente_Bancos"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`CREATE VIEW "cliente_view" AS SELECT "clientes"."Id" AS "Id", "clientes"."Nome" AS "clientes" FROM "clientes" "clientes"`, undefined);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, ["VIEW", "public", "cliente_view", "SELECT \"clientes\".\"Id\" AS \"Id\", \"clientes\".\"Nome\" AS \"clientes\" FROM \"clientes\" \"clientes\""]);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`, ["public", "cliente_view"]);
        await queryRunner.query(`DROP VIEW "cliente_view"`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" DROP CONSTRAINT "FK_e9da98e93d90b185041db784694"`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" DROP CONSTRAINT "FK_a43676820de842c6e93047ba8e6"`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" DROP CONSTRAINT "FK_169183c31975c107ebd6bcc5a9c"`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes" DROP CONSTRAINT "FK_e3254c72ac5e3fbb82565d3a8ae"`, undefined);
        await queryRunner.query(`DROP TABLE "clientes"`, undefined);
        await queryRunner.query(`DROP TABLE "cliente_Enderecos"`, undefined);
        await queryRunner.query(`DROP TABLE "cliente_Documentos"`, undefined);
        await queryRunner.query(`DROP TABLE "cliente_Conjuges"`, undefined);
        await queryRunner.query(`DROP TABLE "cliente_Bancos"`, undefined);
    }
}
exports.Migracao11604706427991 = Migracao11604706427991;
//# sourceMappingURL=1604706427991-Migracao1.js.map