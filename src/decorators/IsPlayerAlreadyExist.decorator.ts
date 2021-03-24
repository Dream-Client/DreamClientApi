import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PlayerService } from 'src/player/player.service';

@ValidatorConstraint({ name: 'IsPlayerAlreadyExist', async: true })
@Injectable() // this is needed in order to the class be injected into the module
export class IsPlayerAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly playerService: PlayerService) { }

  //, args: ValidationArguments
  async validate(email: any) {
    const player = await this.playerService.findByEmail(email);
    if (player)
      return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Player with provided email already exists`;
  }
}

export function IsPlayerAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPlayerAlreadyExistConstraint,
    });
  };
}