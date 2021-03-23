import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IsLicence } from 'src/decorators/IsLicence.decorator';

export class GetClientDto {
  @IsNotEmpty()
  @IsString()
  @IsLicence()
  licence: string;

  @IsArray()
  @ArrayMinSize(6)
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  hashes: string[];

  @IsNotEmpty()
  @IsString()
  checksum: string;
}
