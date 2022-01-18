import { CreateLicenseInput } from './create-license.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLicenseInput extends PartialType(CreateLicenseInput) {
  @Field(() => Int)
  id: number;
}
