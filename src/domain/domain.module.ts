import {
  DynamicModule,
  Global,
  Module,
  ModuleMetadata,
  Provider,
} from '@nestjs/common'
import { UserService } from '@/domain/user'
import { ChatService } from '@/domain/chat'
import { MessageService } from '@/domain/message'

const providers: Provider[] = [UserService, ChatService, MessageService]

@Global()
@Module({})
export class DomainModule {
  static forRoot(options: Pick<ModuleMetadata, 'imports'>): DynamicModule {
    return {
      module: DomainModule,
      imports: options.imports,
      providers: [...providers],
      exports: [...providers],
    }
  }
}
