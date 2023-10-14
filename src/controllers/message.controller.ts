import { Controller, Get } from '@nestjs/common'
import { MessageService, MessageResponseDto } from '@/domain'

@Controller('messages')
export class MessageController {
  constructor(private service: MessageService) {}

  @Get()
  getAllMessage(): Promise<MessageResponseDto[]> {
    return this.service.getAll()
  }
}
