import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Migracao11604706427991 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
