import { IsNotEmpty } from "class-validator";

export class GetClientDto {
  @IsNotEmpty()
  licence: string;
  @IsNotEmpty()
  hash1: string;
  @IsNotEmpty()
  hash2: string;
  @IsNotEmpty()
  hash3: string;
  @IsNotEmpty()
  hash4: string;
  @IsNotEmpty()
  hash5: string;
  @IsNotEmpty()
  hash6: string;
}
