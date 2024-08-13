import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, cts: ExecutionContext) => {
    const req = cts.switchToHttp().getRequest();
    return req.user;
  },
);
