import { MessageEntity } from '@/infrastructure/entities'

export class MessageResponseDto {
  id!: string
  text!: string
}

export function mapMessage(entity: MessageEntity): MessageResponseDto {
  return {
    id: entity.id,
    text: entity.text,
  }
}
