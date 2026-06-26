import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GymModule } from './gym/gym.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GymGateway } from './gateway/gym.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),

    GymModule,
    AuthModule,
    UsersModule,
  ],

  controllers: [AppController],

  providers: [AppService, GymGateway],
})
export class AppModule {}