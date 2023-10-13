import { Injectable } from '@nestjs/common'
import { IUserRepository } from '@/domain/repositories'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../entities'
import { Repository } from 'typeorm'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getList(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }
}
