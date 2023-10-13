import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserTable1697226589874 implements MigrationInterface {
  name = 'CreateUserTable1697226589874'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user"
                             (
                                 "id"        uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                                 "email"     character varying        NOT NULL,
                                 "username"  character varying        NOT NULL,
                                 "password"  character varying        NOT NULL DEFAULT '',
                                 "isAdmin"   boolean                  NOT NULL DEFAULT false,
                                 "firstName" character varying        NOT NULL DEFAULT '',
                                 "lastName"  character varying        NOT NULL DEFAULT '',
                                 "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                 "deletedAt" TIMESTAMP WITH TIME ZONE,
                                 "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                 CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"),
                                 CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"),
                                 CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id")
                             )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_entity"`)
  }
}
