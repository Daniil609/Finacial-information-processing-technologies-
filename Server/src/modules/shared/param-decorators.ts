import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestLocals } from '../../interfaces';

const RequestLocals = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const res = ctx.switchToHttp().getResponse();
  return res as RequestLocals;
});

export const paramDecorator = {
  RequestLocals,
};
