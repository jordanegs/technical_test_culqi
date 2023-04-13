import { IPlayer } from './player.interface';

export interface IGame {
  validateWinner(): boolean;
  validateDiceFaces(index: number): boolean;
  playRound(): void;
  start(): void;
}

export interface GameObserver {
  notifyExtraName(player: IPlayer, extraName: string): void;
  notifyChips(player1: IPlayer, player2?: IPlayer): void;
}
