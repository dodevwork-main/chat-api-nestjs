import { MessageEntity } from '@/infrastructure/entities'
import { FindManyOptions, FindOneOptions } from 'typeorm'

export const IMessageRepository = 'IMessageRepository'

export interface IMessageRepository {
  getList(options?: FindManyOptions<MessageEntity>): Promise<MessageEntity[]>

  getByOne(
    options: FindOneOptions<MessageEntity>,
  ): Promise<MessageEntity | null>

  create(entity: Partial<MessageEntity>): Promise<MessageEntity>
}
