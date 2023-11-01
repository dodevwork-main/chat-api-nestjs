import { UserEntity } from '@/infrastructure/entities'

export class AuthUserDto {
  id!: string
  username!: string
  isAdmin!: boolean
}

export function mapAuthUserResponse(entity: UserEntity): AuthUserDto {
  return {
    id: entity.id,
    username: entity.username,
    isAdmin: entity.isAdmin,
  }
}
