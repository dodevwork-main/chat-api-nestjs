import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { UserEntity } from './user.entity'
import { ChatEntity } from './chat.entity'

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ default: '' })
  text!: string

  @ManyToOne(() => UserEntity, (user) => user.messages)
  user!: UserEntity

  @Column()
  userId!: string

  @ManyToOne(() => ChatEntity, (chat) => chat.messages)
  chat!: ChatEntity

  @Column()
  chatId!: string
}
