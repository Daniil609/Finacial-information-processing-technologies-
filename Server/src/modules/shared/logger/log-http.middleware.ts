import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as morgan from 'morgan';
import { StreamOptions } from 'morgan';
import { LoggerService } from './logger.service';

@Injectable()
export class LogHttpMiddleware implements NestMiddleware {
  private middleware: (req: Request, res: Response, next: NextFunction) => void;

  constructor(private loggerService: LoggerService) {
    this.middleware = morgan(
      function (tokens, req: Request, res: Response) {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['response-time'](req, res),
          'ms',
          JSON.stringify({ traceId: res.locals.traceId }),
        ].join(' ');
      },
      { stream: this.getStreamOptions() },
    );
  }
  use(req: Request, res: Response, next: () => void) {
    this.middleware(req, res, next);
  }

  /**
   * Override the stream method by telling
   * Morgan to use our custom logger instead of the console.log.
   */
  private getStreamOptions(): StreamOptions {
    return {
      // Use the http severity
      write: (message: string) => this.loggerService.logger.http(message),
    };
  }
}
