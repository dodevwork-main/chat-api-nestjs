import { Body, Controller, Get, Post } from '@nestjs/common'
import {
  AuthService,
  AuthUserDto,
  LoginDto,
  LoginResponseDto,
  SignUpDto,
  SignUpResponseDto,
} from '@/domain'
import { AuthRoute, AuthUser, PublicRoute } from '../app.guard'

@AuthRoute()
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @PublicRoute()
  @Post('login')
  login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.service.login(dto)
  }

  @PublicRoute()
  @Post('sign-up')
  signUp(@Body() dto: SignUpDto): Promise<SignUpResponseDto> {
    return this.service.signUp(dto)
  }

  @Get('verify')
  verify(@AuthUser() authUser: AuthUserDto): AuthUserDto {
    return authUser
  }
}
