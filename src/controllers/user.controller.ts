import { Controller, Get } from '@nestjs/common'
import { UserService } from '@/domain/user/user.service'
import { UserResponseDto } from '@/domain/user'

@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  getAllUsers(): Promise<UserResponseDto[]> {
    return this.service.getAll()
  }
}
