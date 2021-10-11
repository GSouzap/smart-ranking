import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreatePlayerDto } from './dtos';
import { Player } from './interfaces';

@Injectable()
export class PlayersService {
  constructor(@InjectModel('Player') private readonly playerModule: Model<Player>) {}

  async createUpdatePlayer(createPlayer: CreatePlayerDto): Promise<void> {
    const { email } = createPlayer;

    const playerFinded = await this.playerModule.findOne({ email }).exec();

    if (playerFinded){
      this.update(createPlayer);
    }else{
      this.create(createPlayer);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModule.find().exec();
  }

  async getPlayersByEmail(email: string): Promise<Player> {
    const playerFinded = await this.playerModule.findOne({ email }).exec();

    if(!playerFinded){
      throw new NotFoundException(`Player with e-mail ${email} not fouded`)
    }

    return playerFinded;
  }

  async deletePlayer(email:string): Promise<any> {
    return await this.playerModule.deleteOne({ email }).exec();
  }

  private async create(createPlayer: CreatePlayerDto): Promise<Player> {
    const playerCreated = new this.playerModule(createPlayer);

    return await playerCreated.save();
  }

  private async update(updatePlayer: CreatePlayerDto): Promise<Player> {
    return await this.playerModule.findOneAndUpdate({ email: updatePlayer.email }, { $set: updatePlayer }).exec() 
  }
}
