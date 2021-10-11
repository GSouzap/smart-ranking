import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreatePlayerDto } from './dtos';
import { Player } from './interfaces';

@Injectable()
export class PlayersService {

  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayer: CreatePlayerDto): Promise<void> {
    const { email } = createPlayer;

    const playerFinded = this.players.find(player => player.email === email)

    if (playerFinded){
      this.update(createPlayer, playerFinded);
    }else{
      this.create(createPlayer);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.players;
  }

  async getPlayersByEmail(email: string): Promise<Player> {
    const playerFinded = this.players.find(player => player.email === email);

    if(!playerFinded){
      throw new NotFoundException(`Player with e-mail ${email} not fouded`)
    }

    return playerFinded;
  }

  async deletePlayer(email:string): Promise<boolean> {
    const playerFinded = this.players.find(player => player.email === email);

    if (!playerFinded) {
      throw new NotFoundException(`Player with e-mail ${email} not fouded`)
    }

    this.players = this.players.filter(player => player.email !== playerFinded.email)

    return true;
  }

  private create(createPlayer: CreatePlayerDto): void {
    const { email, name, phoneNumber } = createPlayer;

    const player: Player = {
      _id: uuidv4(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      positionRanking: 1,
      playerPictureUrl: 'www.google.com.br/foto123.jpg'
    };
    this.logger.log(`createPlayerDTO: ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  private update(updatePlayer: CreatePlayerDto, playerFinded: Player): void {
    const { name } = updatePlayer;

    playerFinded.name = name;
  }
}
