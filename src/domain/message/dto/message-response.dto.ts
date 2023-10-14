import { MessageEntity } from '@/infrastructure/entities'

export class MessageResponseDto {
  id!: string
  text!: string
  userId!: string
  chatId!: string
}

export function mapMessage(entity: MessageEntity): MessageResponseDto {
  return {
    id: entity.id,
    text: entity.text,
    userId: entity.userId,
    chatId: entity.chatId,
  }
}
