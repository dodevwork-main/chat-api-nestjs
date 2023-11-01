import { AuthService, AuthUserDto } from '@/domain'
import {
  applyDecorators,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

export enum Metadata {
  AUTH_ROUTE = 'auth_route',
  ADMIN_ROUTE = 'admin_route',
}

export const PublicRoute = () =>
  applyDecorators(SetMetadata(Metadata.AUTH_ROUTE, false))
export const AuthRoute = () =>
  applyDecorators(SetMetadata(Metadata.AUTH_ROUTE, true))
export const AdminRoute = () =>
  applyDecorators(
    SetMetadata(Metadata.AUTH_ROUTE, true),
    SetMetadata(Metadata.ADMIN_ROUTE, true),
  )

export const AuthUser = createParamDecorator(
  (_, ctx: ExecutionContext): AuthUserDto => {
    return ctx.switchToHttp().getRequest<{ user: AuthUserDto }>().user
  },
)

export type AuthRequest = Request & {
  user?: AuthUserDto
}

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const targets = [context.getHandler(), context.getClass()]

    const isAuthRoute = this.reflector.getAllAndOverride(
      Metadata.AUTH_ROUTE,
      targets,
    )
    const isAdminRoute = this.reflector.getAllAndOverride(
      Metadata.ADMIN_ROUTE,
      targets,
    )

    if (!isAuthRoute) {
      return true
    }

    const req = context.switchToHttp().getRequest<AuthRequest>()
    const authDto = await this.authService.validate(req.headers)

    if (isAdminRoute && !authDto.isAdmin) {
      return false
    }

    req.user = authDto

    return true
  }
}
