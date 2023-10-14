import { Inject, Injectable } from '@nestjs/common'
import { IMessageRepository } from '../repositories'
import { mapMessage, MessageResponseDto } from './dto'

@Injectable()
export class MessageService {
  constructor(
    @Inject(IMessageRepository) private messageRepository: IMessageRepository,
  ) {}

  async getAll(): Promise<MessageResponseDto[]> {
    const messages = await this.messageRepository.getList()
    return messages.map(mapMessage)
  }
}
