import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserTable1697296577352 implements MigrationInterface {
  name = 'CreateUserTable1697296577352'

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
                                 CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                                 CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                                 CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                             )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
  }
}
