import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { MessageEntity } from './message.entity'
import { UserEntity } from './user.entity'

@Entity('chat')
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  slug!: string

  @Column()
  title!: string

  @Column({ default: '' })
  description!: string

  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages!: MessageEntity[]

  @ManyToMany(() => UserEntity, (user) => user.chats)
  @JoinTable({ name: 'chat_user' })
  users!: UserEntity[]
}
