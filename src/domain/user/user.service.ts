import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { IUserRepository } from '@/domain/repositories'
import { mapUser, UserResponseDto } from './dto'

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async getAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.getAll()
    return users.map(mapUser)
  }

  async getById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.getById(id)
    if (!user) {
      throw new BadRequestException('User not found')
    }

    return mapUser(user)
  }
}
