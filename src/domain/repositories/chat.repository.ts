import { ChatEntity } from '@/infrastructure/entities'
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions'

export const IChatRepository = 'IChatRepository'

export interface IChatRepository {
  getList(): Promise<ChatEntity[]>

  getById(
    id: string,
    options?: FindManyOptions<ChatEntity>,
  ): Promise<ChatEntity | null>

  getOneBySlug(slug: string): Promise<ChatEntity | null>
}
