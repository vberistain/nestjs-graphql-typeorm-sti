import { createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from './user-payload.entity';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        return req;
    }
}

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): UserPayload => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});
