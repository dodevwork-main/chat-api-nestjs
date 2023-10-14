import { ChatEntity } from '@/infrastructure/entities'

export class ChatResponseDto {
  id!: string
  slug!: string
  title!: string
  description!: string
}

export function mapChat(entity: ChatEntity): ChatResponseDto {
  return {
    id: entity.id,
    slug: entity.slug,
    title: entity.title,
    description: entity.description,
  }
}
