import { Player } from './player.model';

export class PlayerFactory {
  static createPlayer(name: string): Player {
    return new Player(name);
  }
}
