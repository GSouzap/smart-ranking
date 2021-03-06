import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.wbu3x.mongodb.net/smartranking?retryWrites=true&w=majority'
    ),
    PlayersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
