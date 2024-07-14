import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [NotificationModule, ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
