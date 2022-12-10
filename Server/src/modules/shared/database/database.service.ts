import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize';
import { EnvironmentVariables } from '../../../constants/env-variables';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private sequelize: Sequelize;

  constructor(private configService: ConfigService<EnvironmentVariables>) {
    const dbConfig = configService.get('DATABASE');
    this.sequelize = new Sequelize({
      ...dbConfig,
      logging: (sql) => {
        Logger.log('TEST: sql query', sql);
      },
    });
  }

  async onApplicationShutdown(signal?: string) {
    await this.disconnect();
  }

  getSequelize() {
    return this.sequelize;
  }

  async connect(): Promise<void> {
    await this.sequelize.authenticate();
  }

  async disconnect(): Promise<void> {
    await this.sequelize.close();
  }
}
