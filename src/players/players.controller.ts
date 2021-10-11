import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreatePlayerDto } from './dtos';
import { Player } from './interfaces';
import { PlayersService } from './players.service';
import { PlayersParamsValidatorPipe } from './pipes';

@Controller('api/v1/players')
export class PlayersController {

  constructor(private readonly playersService: PlayersService){}

  @Post('/')
  @UsePipes(ValidationPipe)
  async createUpdatePlayer(@Body() createPlayer: CreatePlayerDto): Promise<any> {
    await this.playersService.createUpdatePlayer(createPlayer);
  }

  @Get('/')
  async getPlayers(@Query('email', PlayersParamsValidatorPipe) email: string): Promise<Player | Player[]> {
    if(email) {
      return await this.playersService.getPlayersByEmail(email);
    }

    return await this.playersService.getAllPlayers();
  }

  @Delete('/')
  async deletePlayer(@Query('email', PlayersParamsValidatorPipe) email:string): Promise<boolean> {
    return await this.playersService.deletePlayer(email);
  }
}
