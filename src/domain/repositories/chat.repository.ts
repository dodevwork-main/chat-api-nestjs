import { ChatEntity } from '@/infrastructure/entities'

export const IChatRepository = 'IChatRepository'

export interface IChatRepository {
  getList(): Promise<ChatEntity[]>
}
