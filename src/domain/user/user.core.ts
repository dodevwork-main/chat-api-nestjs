import { UserEntity } from '@/infrastructure/entities'
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import { ICryptoRepository, IUserRepository } from '../repositories'

const SALT_ROUNDS = 10

export class UserCore {
  constructor(
    private userRepository: IUserRepository,
    private cryptoRepository: ICryptoRepository,
  ) {}

  async createUser(dto: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.getByUsername(dto.username)
    if (user) {
      throw new BadRequestException('User exists')
    }

    try {
      const payload: Partial<UserEntity> = { ...dto }
      if (payload.password) {
        payload.password = await this.cryptoRepository.hashBcrypt(
          payload.password,
          SALT_ROUNDS,
        )
      }

      return this.userRepository.create(payload)
    } catch (e) {
      throw new InternalServerErrorException('Failed to register new user')
    }
  }
}
