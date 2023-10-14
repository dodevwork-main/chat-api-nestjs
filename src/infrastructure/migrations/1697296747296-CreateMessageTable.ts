import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateMessageTable1697296747296 implements MigrationInterface {
  name = 'CreateMessageTable1697296747296'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "message"
                             (
                                 "id"     uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "text"   character varying NOT NULL DEFAULT '',
                                 "userId" uuid              NOT NULL,
                                 "chatId" uuid              NOT NULL,
                                 CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")
                             )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "message"`)
  }
}
