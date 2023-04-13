export interface IPlayer {
  get name(): string;
  get chips(): number;
  get fullName(): string;

  rollDice(diceFaces: string): Array<string>;
}

export interface PlayerObserver {
  get name(): string;
  updateExtraName(extraName: string): void;
  updateChips(chip: number): void;
}
