import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTablePriority2024021604030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO status (name) VALUES ('Aguardando aprovação'), (' Não iniciado'),('Em andamento'),('Em teste'),('Concluido') ,('Aguardando Code Review')
    ,('Cancelado')
    ,('Reprovado')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
