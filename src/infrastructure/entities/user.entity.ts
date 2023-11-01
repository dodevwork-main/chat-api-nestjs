import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { MessageEntity } from './message.entity'
import { ChatEntity } from './chat.entity'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  username!: string

  @Column({ select: false })
  password!: string

  @Column({ default: '' })
  email!: string

  @Column({ default: false })
  isAdmin!: boolean

  @Column({ default: '' })
  firstName!: string

  @Column({ default: '' })
  lastName!: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt!: Date | null

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages!: MessageEntity[]

  @ManyToMany(() => ChatEntity, (chat) => chat.users)
  chats!: ChatEntity[]
}
