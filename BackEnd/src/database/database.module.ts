import { Module } from '@nestjs/common';
import { databaseProviders } from './database.Service';
@Module({
     imports:[...databaseProviders],
     exports:[...databaseProviders],

 })
export class DatabaseModule {}
