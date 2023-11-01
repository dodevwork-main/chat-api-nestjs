import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  username!: string

  @IsString()
  @IsNotEmpty()
  password!: string

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email!: string

  @IsOptional()
  @IsString()
  firstName!: string

  @IsOptional()
  @IsString()
  lastName!: string
}
