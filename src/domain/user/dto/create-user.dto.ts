import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { toEmail } from '../../domain.utils'

export class CreateUserDto {
  @IsEmail()
  @Transform(toEmail)
  email!: string

  @IsNotEmpty()
  @IsString()
  username!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}
