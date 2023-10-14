import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
