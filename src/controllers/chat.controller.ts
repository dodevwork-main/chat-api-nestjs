import { Controller, Get, Param } from '@nestjs/common'
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

  @Get(':slug')
  getOneBySlug(@Param('slug') slug: string): Promise<ChatResponseDto | null> {
    return this.service.getOneBySlug(slug)
  }
}
