import { Controller, Get } from '@nestjs/common'
import { ChatResponseDto, ChatService } from '@/domain'
import { AuthRoute } from '../app.guard'

@AuthRoute()
@Controller('chats')
export class ChatController {
  constructor(private service: ChatService) {}

  @Get()
  getAllChats(): Promise<ChatResponseDto[]> {
    return this.service.getAll()
  }
}
