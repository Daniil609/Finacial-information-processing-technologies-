import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SharedModule } from '../../shared/shared.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [SharedModule, CommentModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
