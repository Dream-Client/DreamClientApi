import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsPlayerAlreadyExist } from 'src/decorators/IsPlayerAlreadyExist.decorator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsPlayerAlreadyExist()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  discordId: string;

  @IsNotEmpty()
  @IsString()
  discordName: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  patreonId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  patreonName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  manager?: number;
}
