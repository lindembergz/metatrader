import {MigrationInterface, QueryRunner} from "typeorm";

export class Migracao11605144283174 implements MigrationInterface {
    name = 'Migracao11605144283174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `cliente_Bancos` (`Id` int NOT NULL AUTO_INCREMENT, `Nome` varchar(15) NULL, `Agencia` varchar(6) NULL, `Conta` varchar(8) NULL, `TipoConta` varchar(10) NULL, `AporteFinanceiro` double NULL DEFAULT '0', `TipoMoeda` varchar(15) NULL, PRIMARY KEY (`Id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cliente_Conjuges` (`Id` int NOT NULL AUTO_INCREMENT, `Nome` varchar(50) NULL, `CPF` varchar(14) NULL, `RG` varchar(10) NULL, `Celular` varchar(12) NULL, PRIMARY KEY (`Id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cliente_Documentos` (`Id` int NOT NULL AUTO_INCREMENT, `CPF` varchar(15) NULL, `RG` varchar(10) NULL, `DataEmissaoRG` date NULL, `OrgaoExpeditorRG` varchar(15) NULL, PRIMARY KEY (`Id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cliente_Enderecos` (`Id` int NOT NULL AUTO_INCREMENT, `Logradouro` varchar(30) NULL, `Numero` varchar(5) NULL, `Bairro` varchar(15) NULL, `Municipio` varchar(15) NULL, `UF` varchar(2) NULL, `Cep` varchar(8) NULL, `Pais` varchar(10) NULL, PRIMARY KEY (`Id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `metatraders` (`Id` int NOT NULL AUTO_INCREMENT, `Servidor` varchar(50) NOT NULL, `Login` varchar(20) NULL, `Senha` varchar(8) NULL, UNIQUE INDEX `IDX_0b4a58f05b1d4acddbd9ebd36b` (`Servidor`), PRIMARY KEY (`Id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `participacoes` (`Id` int NOT NULL AUTO_INCREMENT, `Status` varchar(10) NULL DEFAULT 'Active', `Percentual` double NULL DEFAULT '0', `Cliente_id` int NULL, `Metatrader_id` int NULL, PRIMARY KEY (`Id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `clientes` (`Id` int NOT NULL AUTO_INCREMENT, `Nome` varchar(50) NOT NULL, `Status` varchar(10) NULL DEFAULT 'Active', `Email` varchar(40) NULL, `Celular` varchar(30) NULL, `DataNascimento` date NULL, `Profissao` varchar(30) NULL, `Nacionalidade` varchar(15) NULL, `ResponsavelLegal` varchar(14) NULL, `Login` varchar(20) NULL, `Senha` varchar(8) NULL, `EstadoCivil` varchar(14) NULL, `Endereco_id` int NOT NULL, `Documento_id` int NOT NULL, `Conjuge_id` int NOT NULL, `Banco_id` int NOT NULL, UNIQUE INDEX `IDX_c005501b094c2a9f255bbd6cfa` (`Nome`), UNIQUE INDEX `REL_e3254c72ac5e3fbb82565d3a8a` (`Endereco_id`), UNIQUE INDEX `REL_169183c31975c107ebd6bcc5a9` (`Documento_id`), UNIQUE INDEX `REL_a43676820de842c6e93047ba8e` (`Conjuge_id`), UNIQUE INDEX `REL_e9da98e93d90b185041db78469` (`Banco_id`), PRIMARY KEY (`Id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `participacoes` ADD CONSTRAINT `FK_ecfac3af8fc980e1722e53e67ae` FOREIGN KEY (`Cliente_id`) REFERENCES `clientes`(`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `participacoes` ADD CONSTRAINT `FK_5ea1aa2a52ff052b5e8b3360af1` FOREIGN KEY (`Metatrader_id`) REFERENCES `metatraders`(`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `clientes` ADD CONSTRAINT `FK_e3254c72ac5e3fbb82565d3a8ae` FOREIGN KEY (`Endereco_id`) REFERENCES `cliente_Enderecos`(`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `clientes` ADD CONSTRAINT `FK_169183c31975c107ebd6bcc5a9c` FOREIGN KEY (`Documento_id`) REFERENCES `cliente_Documentos`(`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `clientes` ADD CONSTRAINT `FK_a43676820de842c6e93047ba8e6` FOREIGN KEY (`Conjuge_id`) REFERENCES `cliente_Conjuges`(`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `clientes` ADD CONSTRAINT `FK_e9da98e93d90b185041db784694` FOREIGN KEY (`Banco_id`) REFERENCES `cliente_Bancos`(`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("CREATE VIEW `cliente_view` AS SELECT `clientes`.`Id` AS `Id`, `clientes`.`Nome` AS `clientes` FROM `clientes` `clientes`");
        await queryRunner.query("INSERT INTO `mydb`.`typeorm_metadata`(`type`, `schema`, `name`, `value`) VALUES (?, ?, ?, ?)", ["VIEW","mydb","cliente_view","SELECT `clientes`.`Id` AS `Id`, `clientes`.`Nome` AS `clientes` FROM `clientes` `clientes`"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM `mydb`.`typeorm_metadata` WHERE `type` = 'VIEW' AND `schema` = ? AND `name` = ?", ["mydb","cliente_view"]);
        await queryRunner.query("DROP VIEW `cliente_view`");
        await queryRunner.query("ALTER TABLE `clientes` DROP FOREIGN KEY `FK_e9da98e93d90b185041db784694`");
        await queryRunner.query("ALTER TABLE `clientes` DROP FOREIGN KEY `FK_a43676820de842c6e93047ba8e6`");
        await queryRunner.query("ALTER TABLE `clientes` DROP FOREIGN KEY `FK_169183c31975c107ebd6bcc5a9c`");
        await queryRunner.query("ALTER TABLE `clientes` DROP FOREIGN KEY `FK_e3254c72ac5e3fbb82565d3a8ae`");
        await queryRunner.query("ALTER TABLE `participacoes` DROP FOREIGN KEY `FK_5ea1aa2a52ff052b5e8b3360af1`");
        await queryRunner.query("ALTER TABLE `participacoes` DROP FOREIGN KEY `FK_ecfac3af8fc980e1722e53e67ae`");
        await queryRunner.query("DROP INDEX `REL_e9da98e93d90b185041db78469` ON `clientes`");
        await queryRunner.query("DROP INDEX `REL_a43676820de842c6e93047ba8e` ON `clientes`");
        await queryRunner.query("DROP INDEX `REL_169183c31975c107ebd6bcc5a9` ON `clientes`");
        await queryRunner.query("DROP INDEX `REL_e3254c72ac5e3fbb82565d3a8a` ON `clientes`");
        await queryRunner.query("DROP INDEX `IDX_c005501b094c2a9f255bbd6cfa` ON `clientes`");
        await queryRunner.query("DROP TABLE `clientes`");
        await queryRunner.query("DROP TABLE `participacoes`");
        await queryRunner.query("DROP INDEX `IDX_0b4a58f05b1d4acddbd9ebd36b` ON `metatraders`");
        await queryRunner.query("DROP TABLE `metatraders`");
        await queryRunner.query("DROP TABLE `cliente_Enderecos`");
        await queryRunner.query("DROP TABLE `cliente_Documentos`");
        await queryRunner.query("DROP TABLE `cliente_Conjuges`");
        await queryRunner.query("DROP TABLE `cliente_Bancos`");
    }

}
