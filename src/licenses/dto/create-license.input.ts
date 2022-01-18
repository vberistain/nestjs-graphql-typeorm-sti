import { InputType, Int, Field, OmitType } from '@nestjs/graphql';
import { License } from '../license.entity';

@InputType()
export class CreateLicenseInput extends OmitType(License, ['content']) {
    @Field(() => Int)
    contentId: number;
}
