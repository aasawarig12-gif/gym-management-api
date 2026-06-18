import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GymModule } from './gym/gym.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/gymdb',
    ),

    GymModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})

export class AppModule {}