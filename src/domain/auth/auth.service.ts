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
import { ICryptoRepository, IUserRepository } from '../repositories'
import { IncomingHttpHeaders } from 'http'
import { isUUID } from 'class-validator'
import { UserEntity } from '@/infrastructure/entities'
import { UserCore } from '../user'

@Injectable()
export class AuthService {
  private userCore: UserCore

  constructor(
    @Inject(ICryptoRepository) private cryptoRepository: ICryptoRepository,
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {
    this.userCore = new UserCore(userRepository, cryptoRepository)
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.getByUsername(dto.username, true)

    const isAuthenticated = this.validatePassword(dto.password, user)

    if (!isAuthenticated) {
      throw new UnauthorizedException('Incorrect email or password')
    }

    return mapLoginResponse(user)
  }

  async signUp(dto: SignUpDto): Promise<SignUpResponseDto> {
    const user = await this.userRepository.getByUsername(dto.username)

    if (user) {
      throw new BadRequestException('The server already has an user')
    }

    const createdUser = await this.userCore.createUser({
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

  private validatePassword(inputPassword: string, user: UserEntity): boolean {
    if (!user || !user.password) {
      return false
    }

    return this.cryptoRepository.compareBcrypt(inputPassword, user.password)
  }
}
