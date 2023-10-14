import { Global, Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './database.config'
import { databaseEntities } from './entities'
import { IChatRepository, IMessageRepository, IUserRepository } from '@/domain'
import {
  ChatRepository,
  MessageRepository,
  UserRepository,
} from './repositories'

const providers: Provider[] = [
  { provide: IUserRepository, useClass: UserRepository },
  { provide: IMessageRepository, useClass: MessageRepository },
  { provide: IChatRepository, useClass: ChatRepository },
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
