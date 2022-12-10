import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permissions.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { ProductModule } from './product/product.module';
import { ProductTypeModule } from './productType/productType.module';
import { CommentModule } from './comment/comment.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    AuthModule,
    PermissionModule,
    UsersModule,
    ProfileModule,
    ProductModule,
    ProductTypeModule,
    CommentModule,
    MessageModule,
  ],
})
export class FeaturesModule {}
