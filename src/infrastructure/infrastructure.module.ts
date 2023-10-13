import { Global, Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './database.config'
import { databaseEntities } from './entities'
import { IUserRepository } from '@/domain'
import { UserRepository } from './repositories'

const providers: Provider[] = [
  { provide: IUserRepository, useClass: UserRepository },
]

const imports = [
  TypeOrmModule.forRoot(databaseConfig),
  TypeOrmModule.forFeature(databaseEntities),
]

@Global()
@Module({
  imports,
  providers,
  exports: providers,
})
export class InfrastructureModule {}
