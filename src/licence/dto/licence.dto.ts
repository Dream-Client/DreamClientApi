import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IsLicence } from 'src/decorators/IsLicence.decorator';

export class LicenceDto {
  @IsNotEmpty()
  @IsString()
  @IsLicence()
  licenceKey: string;

  @IsNotEmpty()
  @IsString()
  hashes: string;

  @IsNotEmpty()
  @IsDateString()
  expirationDate: Date;

  @IsNotEmpty()
  @IsString()
  featureMask: string;

  @IsNumber()
  status: number;

  @IsNotEmpty()
  @IsNumber()
  playerId: number;
}
