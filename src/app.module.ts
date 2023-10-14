import { Module } from '@nestjs/common'
import { controllers } from './controllers'
import { DomainModule } from '@/domain'
import { InfrastructureModule } from '@/infrastructure'

@Module({
  imports: [DomainModule.forRoot({ imports: [InfrastructureModule] })],
  controllers,
})
export class AppModule {}
