import { Inject, Injectable } from '@nestjs/common'
import { IUserRepository } from '@/domain/repositories'
import { mapUser, UserResponseDto } from '@/domain/user/user-response.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async getAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.getList()
    return users.map(mapUser)
  }
}
