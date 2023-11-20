import { IChatRepository } from '@/domain'
import { InjectRepository } from '@nestjs/typeorm'
import { ChatEntity } from '../entities'
import { Repository } from 'typeorm'
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions'

export class ChatRepository implements IChatRepository {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
  ) {}

  getList(): Promise<ChatEntity[]> {
    return this.chatRepository.find()
  }

  getOneBySlug(slug: string): Promise<ChatEntity | null> {
    return this.chatRepository.findOneBy({ slug })
  }

  async getById(
    id: string,
    options: FindManyOptions<ChatEntity>,
  ): Promise<ChatEntity | null> {
    const chats = await this.chatRepository.find({ where: { id }, ...options })

    return chats?.[0] ?? null
  }
}
