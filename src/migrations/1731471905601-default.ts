import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1731471905601 implements MigrationInterface {
    name = 'Default1731471905601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("permission_id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1717db2235a5b169822e7f753b1" PRIMARY KEY ("permission_id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("status_id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c29343a0448c20d631bbca4a5ab" PRIMARY KEY ("status_id"))`);
        await queryRunner.query(`CREATE TABLE "backlogs" ("backlog_id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" integer, "project_id" integer, CONSTRAINT "PK_27f0087b71cba2eebbe4e3a5a4f" PRIMARY KEY ("backlog_id"))`);
        await queryRunner.query(`CREATE TABLE "sprints" ("sprint_id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "squad_id" integer, "create_by" integer, "backlog_id" integer, CONSTRAINT "PK_833055f6b5b4f922d828c336c44" PRIMARY KEY ("sprint_id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("comment_id" SERIAL NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" integer, "task_id" integer, "subtask_id" integer, CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "subtask" ("subtask_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" integer, "responsible_by" integer, "task_id" integer, "status_id" integer, "priority_id" integer, "squad_id" integer, "sprint_id" integer, CONSTRAINT "PK_6b365ef2aa04153d463dd777496" PRIMARY KEY ("subtask_id"))`);
        await queryRunner.query(`CREATE TABLE "priorities" ("priority_id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_29175997a8046949b40fac05a0a" PRIMARY KEY ("priority_id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("task_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" integer, "responsible_by" integer, "project_id" integer, "priority_id" integer, "status_id" integer, "squad_id" integer, "sprint_id" integer, "backlog_id" integer, CONSTRAINT "PK_3feca00d238e5cf50185fab8d46" PRIMARY KEY ("task_id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("project_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "squad_id" integer, "user_id" integer, CONSTRAINT "PK_b3613537a59b41f5811258edf99" PRIMARY KEY ("project_id"))`);
        await queryRunner.query(`CREATE TABLE "squads" ("squad_id" SERIAL NOT NULL, "name" character varying NOT NULL, "user_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1534c99fbfaca97e90af468263" PRIMARY KEY ("squad_id"))`);
        await queryRunner.query(`CREATE TABLE "permissionusers" ("permissionUser_id" SERIAL NOT NULL, "name" character varying NOT NULL, "createvalue" boolean NOT NULL DEFAULT false, "deletevalue" boolean NOT NULL DEFAULT false, "updatevalue" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_21ef6b9a2f20f34cfe69ac9c74c" PRIMARY KEY ("permissionUser_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "permissionUser_id" integer, "permission_id" integer, "squad_id" integer, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "user_created" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "creatorUserId" integer, "permissionUserPermissionUserId" integer, "permissionPermissionId" integer, "squad_id" integer, CONSTRAINT "PK_2658d4029dc1bf7529ebb04c047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "backlogs" ADD CONSTRAINT "FK_e81683a46cfefa0ec0349a3d005" FOREIGN KEY ("create_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "backlogs" ADD CONSTRAINT "FK_324cade551ae41cc67ad0f2b450" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprints" ADD CONSTRAINT "FK_f4cbfaed27a5a2a3d9cc73288b7" FOREIGN KEY ("squad_id") REFERENCES "squads"("squad_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprints" ADD CONSTRAINT "FK_b9b6ca7c07b960c489994bbabb8" FOREIGN KEY ("create_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprints" ADD CONSTRAINT "FK_57369062099f33058758c15a4e9" FOREIGN KEY ("backlog_id") REFERENCES "backlogs"("backlog_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_44ce0f2d5bcfe80d87459e15f05" FOREIGN KEY ("create_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_18c2493067c11f44efb35ca0e03" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_6e8005efa61bc3ec37a0b0cc1ae" FOREIGN KEY ("subtask_id") REFERENCES "subtask"("subtask_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_b74d6fb8ac653e9171aca58e02e" FOREIGN KEY ("create_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_123bdcd7b0c099c0cba9c6dd288" FOREIGN KEY ("responsible_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_e84f91c650ae89d4f2ce008ce39" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_a16e80be9897a8068ea797585f0" FOREIGN KEY ("status_id") REFERENCES "status"("status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_64179a89214e38f62eef7490152" FOREIGN KEY ("priority_id") REFERENCES "priorities"("priority_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_56d0ecf793713bdd68fbc410554" FOREIGN KEY ("squad_id") REFERENCES "squads"("squad_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_b3fa2112e983afc229a8378df25" FOREIGN KEY ("sprint_id") REFERENCES "sprints"("sprint_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_a9f3df120b1268395a7870f96ee" FOREIGN KEY ("create_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_70a5f68c8654791a66f0af3265e" FOREIGN KEY ("responsible_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_9eecdb5b1ed8c7c2a1b392c28d4" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_5d1c8f7898b5b84ad5ce08fcff8" FOREIGN KEY ("priority_id") REFERENCES "priorities"("priority_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e28288969fa7827bd12680cfe10" FOREIGN KEY ("status_id") REFERENCES "status"("status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_cfaaa1a413befdf73c92d21fb8f" FOREIGN KEY ("squad_id") REFERENCES "squads"("squad_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_b512d5a489d692f66569978b8a7" FOREIGN KEY ("sprint_id") REFERENCES "sprints"("sprint_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_bf39bd3b3bdf10af0aa0e93ac98" FOREIGN KEY ("backlog_id") REFERENCES "backlogs"("backlog_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_359af2de54ee9e12d1ec37f9e2d" FOREIGN KEY ("squad_id") REFERENCES "squads"("squad_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_bd55b203eb9f92b0c8390380010" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "squads" ADD CONSTRAINT "FK_f92d3b8b562aa2d9aacafe70c3d" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_22a7f8cb99c0e2488d4c2247a91" FOREIGN KEY ("permissionUser_id") REFERENCES "permissionusers"("permissionUser_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_4daed8ecfcce827ad3a6ba2587c" FOREIGN KEY ("permission_id") REFERENCES "permissions"("permission_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_800f34018755f04deb020208a7f" FOREIGN KEY ("squad_id") REFERENCES "squads"("squad_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_created" ADD CONSTRAINT "FK_bd309c69436689040cd7fa709a6" FOREIGN KEY ("creatorUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_created" ADD CONSTRAINT "FK_c7fc68b1746b5951e0743a905de" FOREIGN KEY ("permissionUserPermissionUserId") REFERENCES "permissionusers"("permissionUser_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_created" ADD CONSTRAINT "FK_7bc703d886de524fb8ea8da9362" FOREIGN KEY ("permissionPermissionId") REFERENCES "permissions"("permission_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_created" ADD CONSTRAINT "FK_f7560130e6147aad846d60718af" FOREIGN KEY ("squad_id") REFERENCES "squads"("squad_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
   
        await queryRunner.query(`INSERT INTO permissionusers (name, createValue, deleteValue, updateValue) 
            VALUES ('product owner', true, true, true), 
            ('scrum master', true, true, true),
            ('developer', true, false, true),
            ('guest', false, false, true)`);

        await queryRunner.query(
            `INSERT INTO permissions (name, type) VALUES ('administrador', true), ('colaborador', false)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_created" DROP CONSTRAINT "FK_f7560130e6147aad846d60718af"`);
        await queryRunner.query(`ALTER TABLE "user_created" DROP CONSTRAINT "FK_7bc703d886de524fb8ea8da9362"`);
        await queryRunner.query(`ALTER TABLE "user_created" DROP CONSTRAINT "FK_c7fc68b1746b5951e0743a905de"`);
        await queryRunner.query(`ALTER TABLE "user_created" DROP CONSTRAINT "FK_bd309c69436689040cd7fa709a6"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_800f34018755f04deb020208a7f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4daed8ecfcce827ad3a6ba2587c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_22a7f8cb99c0e2488d4c2247a91"`);
        await queryRunner.query(`ALTER TABLE "squads" DROP CONSTRAINT "FK_f92d3b8b562aa2d9aacafe70c3d"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_bd55b203eb9f92b0c8390380010"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_359af2de54ee9e12d1ec37f9e2d"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_bf39bd3b3bdf10af0aa0e93ac98"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_b512d5a489d692f66569978b8a7"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_cfaaa1a413befdf73c92d21fb8f"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e28288969fa7827bd12680cfe10"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_5d1c8f7898b5b84ad5ce08fcff8"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_9eecdb5b1ed8c7c2a1b392c28d4"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_70a5f68c8654791a66f0af3265e"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_a9f3df120b1268395a7870f96ee"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_b3fa2112e983afc229a8378df25"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_56d0ecf793713bdd68fbc410554"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_64179a89214e38f62eef7490152"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_a16e80be9897a8068ea797585f0"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_e84f91c650ae89d4f2ce008ce39"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_123bdcd7b0c099c0cba9c6dd288"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_b74d6fb8ac653e9171aca58e02e"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_6e8005efa61bc3ec37a0b0cc1ae"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_18c2493067c11f44efb35ca0e03"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_44ce0f2d5bcfe80d87459e15f05"`);
        await queryRunner.query(`ALTER TABLE "sprints" DROP CONSTRAINT "FK_57369062099f33058758c15a4e9"`);
        await queryRunner.query(`ALTER TABLE "sprints" DROP CONSTRAINT "FK_b9b6ca7c07b960c489994bbabb8"`);
        await queryRunner.query(`ALTER TABLE "sprints" DROP CONSTRAINT "FK_f4cbfaed27a5a2a3d9cc73288b7"`);
        await queryRunner.query(`ALTER TABLE "backlogs" DROP CONSTRAINT "FK_324cade551ae41cc67ad0f2b450"`);
        await queryRunner.query(`ALTER TABLE "backlogs" DROP CONSTRAINT "FK_e81683a46cfefa0ec0349a3d005"`);
        await queryRunner.query(`DROP TABLE "user_created"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "permissionusers"`);
        await queryRunner.query(`DROP TABLE "squads"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "priorities"`);
        await queryRunner.query(`DROP TABLE "subtask"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "sprints"`);
        await queryRunner.query(`DROP TABLE "backlogs"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
