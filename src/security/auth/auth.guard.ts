import { CanActivate, createParamDecorator, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserPayload } from './user-payload.entity';
import { AuthService } from './auth.service';

@Injectable()
export class GqlUserGuard implements CanActivate {
    constructor(@Inject(AuthService) private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('RUN');
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        try {
            const token = await this.authService.verifyTokenFromRequest(req);
            req.user = token;
        } catch (e) {
            console.log(e);
        }
        return true;
    }
}

@Injectable()
export class GqlAuthGuard implements CanActivate {
    @Inject(AuthService)
    private readonly authService: AuthService;

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        const token = await this.authService.verifyTokenFromRequest(req);
        req.user = token;
        return true;
    }
}

export const User = createParamDecorator((data: unknown, context: ExecutionContext): UserPayload => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});
