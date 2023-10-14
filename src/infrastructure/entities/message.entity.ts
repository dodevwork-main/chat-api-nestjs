import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ default: '' })
  text!: string
}
