import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // dotenv
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ConfigModule.forRoot({ isGlobal: true }),
        // UsersModule,
        AuthModule,
        DatabaseModule,
    ],
    providers: [],
})
export class AppModule {}
