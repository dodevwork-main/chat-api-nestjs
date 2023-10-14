import { Inject, Injectable } from '@nestjs/common'
import { IChatRepository } from '../repositories'
import { ChatResponseDto, mapChat } from './dto'

@Injectable()
export class ChatService {
  constructor(
    @Inject(IChatRepository) private chatRepository: IChatRepository,
  ) {}

  async getAll(): Promise<ChatResponseDto[]> {
    const chats = await this.chatRepository.getList()
    return chats.map(mapChat)
  }
}
