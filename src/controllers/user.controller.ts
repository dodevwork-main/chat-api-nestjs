import { Controller, Get } from '@nestjs/common'
import { UserResponseDto, UserService } from '@/domain'
import { AuthRoute } from '../app.guard'

@AuthRoute()
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  getAllUsers(): Promise<UserResponseDto[]> {
    return this.service.getAll()
  }
}
