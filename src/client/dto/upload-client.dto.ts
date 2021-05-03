import { IsNotEmpty, IsString } from 'class-validator';

export class UploadClientDto {
  // Interceptor takes file away anyway @_@
  //file: any;

  @IsNotEmpty()
  @IsString()
  checksum: string;

  @IsNotEmpty()
  @IsString()
  vrcVersion: string;
}
