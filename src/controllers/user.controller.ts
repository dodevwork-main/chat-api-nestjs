import { Controller, Get } from '@nestjs/common'
import { UserResponseDto, UserService } from '@/domain'

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  getAllUsers(): Promise<UserResponseDto[]> {
    return this.service.getAll()
  }
}
