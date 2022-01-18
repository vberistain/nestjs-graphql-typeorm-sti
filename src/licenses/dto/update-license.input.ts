import { InputType, Int, Field, OmitType } from '@nestjs/graphql';
import { License } from '../license.entity';

@InputType()
export class UpdateLicenseInput extends OmitType(License, ['content', 'id']) {
    @Field(() => Int)
    contentId: number;
}
