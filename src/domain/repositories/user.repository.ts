import { UserEntity } from '@/infrastructure/entities'

export const IUserRepository = 'IUserRepository'

export interface IUserRepository {
  getList(): Promise<UserEntity[]>
}
