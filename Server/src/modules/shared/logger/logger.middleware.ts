import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as uuid from 'uuid';

import { LoggerService } from '../logger/logger.service';

/**
 * Middleware responsible for adding logger to res.locals to be used
 * in controllers, services, etc.
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: LoggerService) {}

  use(req: Request, res: Response, next: () => void) {
    const traceId = uuid.v4();
    res.locals.traceId = traceId;
    res.locals.logger = this.loggerService.logger.child({ traceId });
    next();
  }
}
