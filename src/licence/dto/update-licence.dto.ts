import { PartialType } from '@nestjs/mapped-types';
import { LicenceDto } from './licence.dto';

export class UpdateLicenceDto extends PartialType(LicenceDto) {}
