import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permissions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, PermissionModule, UsersModule],
})
export class FeaturesModule {}
