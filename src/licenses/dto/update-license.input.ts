import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateLicenseInput } from './create-license.input';

@InputType()
export class UpdateLicenseInput extends PartialType(CreateLicenseInput) {
    @Field(() => Int)
    id: number;
}
