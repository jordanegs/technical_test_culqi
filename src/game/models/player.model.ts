import { IPlayer, PlayerObserver } from '../interfaces/player.interface';

export class Player implements IPlayer, PlayerObserver {
  private readonly _name: string;
  private _chips: number;
  private readonly _defaultDices: number;
  private _extraName: string;

  constructor(name: string) {
    this._name = name;
    this._chips = 3;
    this._defaultDices = 3;
    this._extraName = '';
  }

  get name() {
    return this._name;
  }

  get chips() {
    return this._chips;
  }

  get fullName() {
    return `${this._name}:${this._chips}${this._extraName}`;
  }

  updateExtraName(extraName: string): void {
    this._extraName = extraName;
  }

  updateChips(chip: number): void {
    this._chips = this._chips + chip;
  }

  rollDice(diceFaces: string): Array<string> {
    const numDices: number =
      this._chips >= this._defaultDices ? this._defaultDices : this._chips;
    const rolls: Array<string> = [];
    if (diceFaces.length >= numDices) {
      for (let i = 0; i < numDices; i++) {
        rolls.push(diceFaces.substring(i, i + 1));
      }
    }
    return rolls;
  }
}
