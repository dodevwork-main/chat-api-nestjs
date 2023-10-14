import { IChatRepository } from '@/domain'
import { InjectRepository } from '@nestjs/typeorm'
import { ChatEntity } from '../entities'
import { Repository } from 'typeorm'

export class ChatRepository implements IChatRepository {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
  ) {}

  getList(): Promise<ChatEntity[]> {
    return this.chatRepository.find()
  }
}
