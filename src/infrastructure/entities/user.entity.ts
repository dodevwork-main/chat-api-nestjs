import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  email!: string

  @Column({ unique: true })
  username!: string

  @Column({ default: '', select: false })
  password?: string

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
}
