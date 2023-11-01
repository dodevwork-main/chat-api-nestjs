import { Module } from '@nestjs/common'
import { controllers } from './controllers'
import { DomainModule } from '@/domain'
import { InfrastructureModule } from '@/infrastructure'
import { APP_GUARD } from '@nestjs/core'
import { AppGuard } from './app.guard'

@Module({
  imports: [DomainModule.forRoot({ imports: [InfrastructureModule] })],
  providers: [{ provide: APP_GUARD, useExisting: AppGuard }, AppGuard],
  controllers,
})
export class AppModule {}
