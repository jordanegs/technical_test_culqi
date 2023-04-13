import { GameObserver, IGame } from '../interfaces/game.interface';
import { PlayerFactory } from './player-factory.model';
import { IPlayer, PlayerObserver } from '../interfaces/player.interface';

export class Game implements IGame, GameObserver {
  private readonly _caseNumber: number;
  private readonly _players: IPlayer[];
  private _diceFaces: string;
  private _chipsCentralPile: number;
  private _isTheGameOver: boolean;
  private readonly observers: PlayerObserver[] = [];

  constructor(caseNumber: number, numPlayers: number, diceFaces: string) {
    this._caseNumber = caseNumber;
    this._players = [];
    this._diceFaces = diceFaces;
    this._chipsCentralPile = 0;
    this._isTheGameOver = false;
    for (let i = 1; i <= numPlayers; i++) {
      const player = PlayerFactory.createPlayer(`Player ${i}`);
      this.subscribe(player);
      this._players.push(player);
    }
  }

  private subscribe(observer: PlayerObserver): void {
    this.observers.push(observer);
  }

  notifyExtraName(player: IPlayer, extraName: string): void {
    this.observers.forEach((observer) => {
      if (player.name === observer.name) observer.updateExtraName(extraName);
    });
  }

  notifyChips(player1: IPlayer, player2?: IPlayer): void {
    if (!player2) this._chipsCentralPile++;
    this.observers.forEach((observer) => {
      if (player1.name === observer.name) observer.updateChips(-1);
      if (player2 && player2.name === observer.name) observer.updateChips(1);
    });
  }

  validateWinner(): boolean {
    const playersWithChips = this._players.filter((player) => player.chips > 0);
    if (playersWithChips.length === 1) {
      this._isTheGameOver = true;
      this.notifyExtraName(playersWithChips[0], '(W)');
      return true;
    }
    return false;
  }

  validateDiceFaces(index: number): boolean {
    if (this._diceFaces.length === 0) {
      this._isTheGameOver = true;
      this.notifyExtraName(
        this._players[index < this._players.length - 1 ? index + 1 : 0],
        '(*)',
      );
      return true;
    }
    return false;
  }

  playRound(): void {
    const countMaxList: number = this._players.length - 1;
    for (let i = 0; i <= countMaxList; i++) {
      const player = this._players[i];

      if (player.chips === 0) {
        continue;
      }

      const rolls = player.rollDice(this._diceFaces);
      if (rolls.length > 0) {
        this._diceFaces = this._diceFaces.substring(
          rolls.length,
          this._diceFaces.length,
        );
        for (let j = 0; j < rolls.length; j++) {
          switch (rolls[j]) {
            case 'L':
              const leftPlayer = this._players[i < countMaxList ? i + 1 : 0]
              this.notifyChips(player, leftPlayer);
              break;
            case 'R':
              const rightPlayer = this._players[i > 0 ? i - 1 : countMaxList];
              this.notifyChips(player, rightPlayer);
              break;
            case 'C':
              this.notifyChips(player);
              break;
            default:
              break;
          }

          if (this.validateWinner()) break;
        }
      }

      if (this.validateDiceFaces(i) || this._isTheGameOver) break;
    }
  }

  start(): void {
    while (!this._isTheGameOver && this._players.length > 0) {
      this.playRound();

      if (this._isTheGameOver) {
        console.log(`Game ${this._caseNumber}`);
        this._players.forEach((player) => console.log(player.fullName));
        console.log(`Center:${this._chipsCentralPile}`);
      }
    }
  }
}
