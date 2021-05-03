import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLicenceDto {
  @IsNotEmpty()
  @IsNumber()
  playerId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  featureMask: string;

  @IsNotEmpty()
  @IsDateString()
  expirationDate: string;

  @IsOptional()
  @IsNumber()
  status: number;
}
