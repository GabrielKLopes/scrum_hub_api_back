import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTablePermission2024021805010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO permissions (name, type) VALUES ('administrador', true), ('colaborador', false)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
