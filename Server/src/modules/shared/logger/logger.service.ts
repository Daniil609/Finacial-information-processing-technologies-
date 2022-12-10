import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { format as utilFormat } from 'util';

import { EnvironmentVariables } from '../../../constants/env-variables';
import { LOG_LEVEL } from '../../../constants';

const levels = {
  [LOG_LEVEL.ERROR]: 0,
  [LOG_LEVEL.WARN]: 1,
  [LOG_LEVEL.INFO]: 2,
  [LOG_LEVEL.HTTP]: 3,
  [LOG_LEVEL.DEBUG]: 4,
};

@Injectable()
export class LoggerService {
  logger: winston.Logger;

  constructor(private configService: ConfigService<EnvironmentVariables>) {
    // TODO: is it created once?
    this.logger = this.initLogger();
  }

  private initLogger() {
    winston.addColors({
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'white',
    });

    const SPLAT = Symbol.for('splat');
    const format = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      winston.format.printf((info) => {
        // eslint-disable-next-line
        // @ts-ignore-next-line
        const rest = info[SPLAT] || [];
        const before = `${info.level} ${info.timestamp}`;
        const after = JSON.stringify(this.getLogMeta({ traceId: info.traceId }));
        return `${before}: ${utilFormat(info.message, ...rest)} ${after}`;
      }),
      winston.format.colorize({ all: true }),
    );

    return winston.createLogger({
      level: this.getLogLevel(),
      levels,
      format,
      transports: [
        //  Log it to terminal
        new winston.transports.Console({ format }),
        // Write all logs with importance level of `error` or less to `error.log`
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        // Write all logs `all.log`
        new winston.transports.File({ filename: 'logs/all.log' }),
      ],
    });
  }

  private getLogLevel() {
    const LOG_LEVEL = process.env.LOG_LEVEL as string;

    if (!levels.hasOwnProperty(LOG_LEVEL)) throw new Error(`Unsupported log level "${LOG_LEVEL}"`);

    return LOG_LEVEL;
  }

  private getLogMeta(options: { traceId: string }) {
    return {
      traceId: options.traceId,
      app: this.configService.get('APP_NAME'),
      env: this.configService.get('ENV'),
    };
  }
}
