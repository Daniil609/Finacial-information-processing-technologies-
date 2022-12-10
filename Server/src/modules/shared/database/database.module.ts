import { Module } from '@nestjs/common';
import { DatabaseConnectProvider } from './database-connect.providers';
import { DatabaseService } from './database.service';
import { ModelsProvider } from './model.providers';

@Module({
  imports: [],
  providers: [DatabaseService, DatabaseConnectProvider, ModelsProvider],
  exports: [ModelsProvider],
})
export class DatabaseModule {}
