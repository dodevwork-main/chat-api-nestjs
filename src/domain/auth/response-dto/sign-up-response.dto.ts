import { UserEntity } from '@/infrastructure/entities'

export class SignUpResponseDto {
  id!: string
}

export function mapSignUpResponse(entity: UserEntity): SignUpResponseDto {
  return {
    id: entity.id,
  }
}
