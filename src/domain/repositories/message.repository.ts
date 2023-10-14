import { MessageEntity } from '@/infrastructure/entities'

export const IMessageRepository = 'IMessageRepository'

export interface IMessageRepository {
  getList(): Promise<MessageEntity[]>
}
