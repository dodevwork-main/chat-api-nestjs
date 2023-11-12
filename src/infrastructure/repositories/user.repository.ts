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

  getByUsername(
    username: string,
    withPassword?: boolean,
  ): Promise<UserEntity | null> {
    let builder = this.userRepository
      .createQueryBuilder('user')
      .where({ username })

    if (withPassword) {
      builder = builder.addSelect('user.password')
    }

    return builder.getOne()
  }

  create(user: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepository.save(user)
  }
}
