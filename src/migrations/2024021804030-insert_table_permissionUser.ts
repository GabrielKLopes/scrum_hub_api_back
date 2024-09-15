import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTablePermissionUser2024021804030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO permissionusers (name, createValue, deleteValue, updateValue) 
        VALUES ('product owner', true, true, true), 
        ('scrum master', true, true, true),
        ('developer', true, false, true),
        ('guest', false, false, true)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      
    }

}
