import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateChatTable1697296668496 implements MigrationInterface {
  name = 'CreateChatTable1697296668496'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "chat"
                             (
                                 "id"          uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "slug"        character varying NOT NULL,
                                 "title"       character varying NOT NULL,
                                 "description" character varying NOT NULL DEFAULT '',
                                 CONSTRAINT "UQ_0bc9e7abdc2a205fe4c36ad321b" UNIQUE ("slug"),
                                 CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id")
                             )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "chat"`)
  }
}
