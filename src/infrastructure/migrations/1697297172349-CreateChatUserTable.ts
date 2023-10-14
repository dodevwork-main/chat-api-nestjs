import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateChatUserTable1697297172349 implements MigrationInterface {
  name = 'CreateChatUserTable1697297172349'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "chat_user"
                             (
                                 "chatId" uuid NOT NULL,
                                 "userId" uuid NOT NULL,
                                 CONSTRAINT "PK_afbdf3817c9256d3ac030b0e917" PRIMARY KEY ("chatId", "userId")
                             )`)
    await queryRunner.query(
      `CREATE INDEX "IDX_8826d04b711b84e36398894275" ON "chat_user" ("chatId") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_5e9874ea3bd3524db95c2d88e5" ON "chat_user" ("userId") `,
    )
    await queryRunner.query(`ALTER TABLE "chat_user"
        ADD CONSTRAINT "FK_8826d04b711b84e36398894275c" FOREIGN KEY ("chatId") REFERENCES "chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE`)
    await queryRunner.query(`ALTER TABLE "chat_user"
        ADD CONSTRAINT "FK_5e9874ea3bd3524db95c2d88e53" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat_user" DROP CONSTRAINT "FK_5e9874ea3bd3524db95c2d88e53"`,
    )
    await queryRunner.query(
      `ALTER TABLE "chat_user" DROP CONSTRAINT "FK_8826d04b711b84e36398894275c"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5e9874ea3bd3524db95c2d88e5"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8826d04b711b84e36398894275"`,
    )
    await queryRunner.query(`DROP TABLE "chat_user"`)
  }
}
