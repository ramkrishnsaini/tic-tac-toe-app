import { Injectable } from '@angular/core';
import { Player } from '../model/Player';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeGameService {
  private readonly players: Player[];

  constructor() {
    this.players = [{ tile: 'X' }, { tile: 'O' }];
  }

  public getPlayers(): Player[] {
    return this.players;
  }
}
