import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './modules/shared/shared.module';
import configuration from './config/configuration';
import { LogHttpMiddleware } from './modules/shared/logger/log-http.middleware';
import { LoggerMiddleware } from './modules/shared/logger/logger.middleware';
import { FeaturesModule } from './modules/features/features.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    SharedModule,
    FeaturesModule,
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
