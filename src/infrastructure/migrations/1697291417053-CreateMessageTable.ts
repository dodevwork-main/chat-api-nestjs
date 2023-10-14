import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateMessageTable1697291417053 implements MigrationInterface {
  name = 'CreateMessageTable1697291417053'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "message"
                             (
                                 "id"   uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "text" character varying NOT NULL DEFAULT '',
                                 CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")
                             )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "message"`)
  }
}
