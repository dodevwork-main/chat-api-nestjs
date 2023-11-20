import { IMessageRepository } from '@/domain'
import { InjectRepository } from '@nestjs/typeorm'
import { MessageEntity } from '../entities'
import { FindOneOptions, Repository } from 'typeorm'
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions'

export class MessageRepository implements IMessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  getList(options?: FindManyOptions<MessageEntity>): Promise<MessageEntity[]> {
    return this.messageRepository.find(options)
  }

  getByOne(
    options: FindOneOptions<MessageEntity>,
  ): Promise<MessageEntity | null> {
    return this.messageRepository.findOne(options)
  }

  create(entity: Partial<MessageEntity>): Promise<MessageEntity> {
    return this.messageRepository.save(entity)
  }
}
