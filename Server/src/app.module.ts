import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './modules/shared/shared.module';
import configuration from './config/configuration';
import { LogHttpMiddleware } from './modules/shared/logger/log-http.middleware';
import { LoggerMiddleware } from './modules/shared/logger/logger.middleware';
import { FeaturesModule } from './modules/features/features.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    SharedModule,
    FeaturesModule,
    MulterModule.register({
      dest: './public',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(LogHttpMiddleware)
      .exclude({ path: 'info', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
