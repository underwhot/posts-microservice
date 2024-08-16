import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlCurrentUser = createParamDecorator(
  (date: unknown, ctx: ExecutionContext) => {
    const reqCtx = GqlExecutionContext.create(ctx);
    return reqCtx.getContext().req.user;
  },
);
