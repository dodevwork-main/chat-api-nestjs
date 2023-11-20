import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common'
import {
  CommunicationEvent,
  IChatRepository,
  ICommunicationRepository,
  IMessageRepository,
} from '../repositories'
import { ChatResponseDto, mapChat } from './response-dto'
import { AuthUserDto } from '@/domain/auth'
import { ListMessagesDto, NewMessageDto } from './dto'

@Injectable()
export class ChatService {
  constructor(
    @Inject(IChatRepository) private chatRepository: IChatRepository,
    @Inject(IMessageRepository) private messageRepository: IMessageRepository,
    @Inject(forwardRef(() => ICommunicationRepository))
    private communicationRepository: ICommunicationRepository,
  ) {}

  async getAll(): Promise<ChatResponseDto[]> {
    const chats = await this.chatRepository.getList()
    return chats.map(mapChat)
  }

  async getOneBySlug(slug: string): Promise<ChatResponseDto | null> {
    const chat = await this.chatRepository.getOneBySlug(slug)
    if (!chat) {
      throw new BadRequestException('Chat not found')
    }
    return mapChat(chat)
  }

  async sendNewMessage(user: AuthUserDto, body: NewMessageDto) {
    const message = await this.messageRepository.create({
      text: body.text,
      userId: user.id,
      chatId: body.chatId,
    })
    const messageWithRelations = await this.messageRepository.getByOne({
      where: { id: message.id },
      relations: { user: true },
    })

    const chat = await this.chatRepository.getById(body.chatId, {
      relations: { users: true },
    })

    if (chat) {
      chat.users.forEach((chatUser) => {
        this.communicationRepository.send(
          CommunicationEvent.ReceiveMessage,
          chatUser.id,
          messageWithRelations,
        )
      })
    }
  }

  async sendListMessages(user: AuthUserDto, body: ListMessagesDto) {
    const messages = await this.messageRepository.getList({
      where: { chatId: body.chatId },
      relations: { user: true },
    })

    this.communicationRepository.send(
      CommunicationEvent.ListMessages,
      user.id,
      messages,
    )
  }
}
