import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { HealthController } from './health.controller';

@Module({
  imports: [SharedModule],
  providers: [],
  controllers: [HealthController],
  exports: [],
})
export class HealthModule {}
