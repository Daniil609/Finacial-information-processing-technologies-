import { Module } from '@nestjs/common';
import { ProductTypeService } from './productType.service';
import { ProductTypeController } from './productType.controller';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [ProductTypeService],
  controllers: [ProductTypeController],
  exports: [ProductTypeService],
})
export class ProductTypeModule {}
