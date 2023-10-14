import { UserEntity } from '@/infrastructure/entities'

export class UserResponseDto {
  id!: string
  email!: string
  username!: string
  firstName!: string
  lastName!: string
  isAdmin!: boolean
  createdAt!: Date
  deletedAt!: Date | null
  updatedAt!: Date
}

export function mapUser(entity: UserEntity): UserResponseDto {
  return {
    id: entity.id,
    email: entity.email,
    username: entity.username,
    firstName: entity.firstName,
    lastName: entity.lastName,
    isAdmin: entity.isAdmin,
    createdAt: entity.createdAt,
    deletedAt: entity.deletedAt,
    updatedAt: entity.updatedAt,
  }
}
