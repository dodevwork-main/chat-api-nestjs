import { Module } from '@nestjs/common'
import { UserController } from './controllers'
import { DomainModule } from '@/domain'
import { InfrastructureModule } from '@/infrastructure'

@Module({
  imports: [DomainModule.forRoot({ imports: [InfrastructureModule] })],
  controllers: [UserController],
})
export class AppModule {}
