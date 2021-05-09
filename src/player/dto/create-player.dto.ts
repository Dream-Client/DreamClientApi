import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsPlayerAlreadyExist } from 'src/decorators/IsPlayerAlreadyExist.decorator';

export class CreatePlayerDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsPlayerAlreadyExist()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  discordId: string;

  @IsDefined()
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
