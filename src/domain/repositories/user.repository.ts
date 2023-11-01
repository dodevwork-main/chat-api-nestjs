import { UserEntity } from '@/infrastructure/entities'

export const IUserRepository = 'IUserRepository'

export interface IUserRepository {
  getAll(): Promise<UserEntity[]>

  getById(id: string): Promise<UserEntity | null>

  getByUsername(username: string): Promise<UserEntity | null>

  create(user: Partial<UserEntity>): Promise<UserEntity>
}
