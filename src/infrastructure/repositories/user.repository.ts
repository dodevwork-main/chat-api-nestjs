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

  getAll(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }

  getById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id })
  }

  getByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ username })
  }

  create(user: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepository.save(user)
  }
}
