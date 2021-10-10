import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos';

@Controller('api/v1/players')
export class PlayersController {

  @Post('/')
  async createUpdatePlayer(@Body() createPlayer: CreatePlayerDto): Promise<any> {
    const { email, name, phoneNumber } = createPlayer;
    return JSON.stringify(`{
      "name": ${name},
      "email": ${email},
      "phoneNumber": ${phoneNumber}
    }`)
  }
}
