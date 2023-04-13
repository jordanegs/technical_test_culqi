import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInputDto {
  @IsNumber(
    {},
    { message: (args) => `${args.property} debe ser de tipo numérico` },
  )
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  caseNumber: number;

  @IsNumber(
    {},
    { message: (args) => `${args.property} debe ser de tipo numérico` },
  )
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  numPlayers: number;

  @IsString({ message: (args) => `${args.property} debe ser de tipo cadena` })
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  diceFaces: string;
}
