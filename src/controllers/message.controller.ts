import { Controller, Get } from '@nestjs/common'
import { MessageService, MessageResponseDto } from '@/domain'
import { AuthRoute } from '../app.guard'

@AuthRoute()
@Controller('messages')
export class MessageController {
  constructor(private service: MessageService) {}

  @Get()
  getAllMessage(): Promise<MessageResponseDto[]> {
    return this.service.getAll()
  }
}
