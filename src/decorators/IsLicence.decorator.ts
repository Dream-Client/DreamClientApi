import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

const LICENCE_REGEX = /^([A-Za-z0-9]{4}-){3}[A-Za-z0-9]{4}$/g;

export function IsLicence(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsLicence',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // const [relatedPropertyName] = args.constraints;
          // const relatedValue = (args.object as any)[relatedPropertyName];
          return typeof value === 'string' && value.match(LICENCE_REGEX) !== null; // you can return a Promise<boolean> here as well, if you want to make async validation
        },
        defaultMessage(args: ValidationArguments) {
          return `$property must be in XXXX-XXXX-XXXX-XXXX format`;
        }
      },
    });
  };
}