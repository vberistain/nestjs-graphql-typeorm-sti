import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { CreateLicenseInput } from '../../../licenses/dto/create-license.input';

@InputType()
export class UpdatePlaylistInput extends PartialType(CreateLicenseInput) {
    @Field(() => Int)
    id: number;
}
