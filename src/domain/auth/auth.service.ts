import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthUserDto, LoginDto, mapAuthUserResponse, SignUpDto } from './dto'
import {
  LoginResponseDto,
  mapLoginResponse,
  mapSignUpResponse,
  SignUpResponseDto,
} from './response-dto'
import { IUserRepository } from '../repositories'
import { IncomingHttpHeaders } from 'http'
import { isUUID } from 'class-validator'

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.getByUsername(dto.username)

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password')
    }

    return mapLoginResponse(user)
  }

  async signUp(dto: SignUpDto): Promise<SignUpResponseDto> {
    const user = await this.userRepository.getByUsername(dto.username)

    if (user) {
      throw new BadRequestException('The server already has an user')
    }

    const createdUser = await this.userRepository.create({
      username: dto.username,
      password: dto.password,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
    })

    return mapSignUpResponse(createdUser)
  }

  async validate(headers: IncomingHttpHeaders): Promise<AuthUserDto> {
    const token = this.getBearerToken(headers)

    /* In the first implementation - token === user.id */
    if (token && isUUID(token)) {
      const user = await this.userRepository.getById(token)

      if (user) {
        return mapAuthUserResponse(user)
      }
    }

    throw new UnauthorizedException('Authentication required')
  }

  private getBearerToken(headers: IncomingHttpHeaders): string | null {
    const [type, token] = (headers.authorization ?? '').split(' ')
    if (type.toLowerCase() === 'bearer') {
      return token
    }

    return null
  }
}
