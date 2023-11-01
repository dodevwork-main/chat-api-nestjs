import { UserEntity } from '@/infrastructure/entities'

export class LoginResponseDto {
  id!: string
}

export function mapLoginResponse(entity: UserEntity): LoginResponseDto {
  return {
    id: entity.id,
  }
}
