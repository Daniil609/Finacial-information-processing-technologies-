import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SharedModule } from '../../shared/shared.module';
import { CommentModule } from '../comment/comment.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [SharedModule, CommentModule, ProductModule],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
