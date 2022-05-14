import { InputType, Field, OmitType } from '@nestjs/graphql';
import { IdOnlyEntity } from '@common/utils';
import { Bundle } from '../bundle.entity';

@InputType()
export class CreateBundleInput extends OmitType(Bundle, ['contents', 'type'] as const, InputType) {
    @Field(() => [IdOnlyEntity])
    contents: IdOnlyEntity[];
}
