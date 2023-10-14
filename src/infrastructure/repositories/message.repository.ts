import { IMessageRepository } from '@/domain'
import { InjectRepository } from '@nestjs/typeorm'
import { MessageEntity } from '../entities'
import { Repository } from 'typeorm'

export class MessageRepository implements IMessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  getList(): Promise<MessageEntity[]> {
    return this.messageRepository.find()
  }
}
