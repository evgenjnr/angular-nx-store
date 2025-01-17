import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
// (...args: string[]) => SetMetadata('user', args)
export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    return ctx;
  }
);
