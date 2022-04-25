import { InputType, Int, Field, OmitType } from '@nestjs/graphql';
import { IdOnlyEntity } from '../../../common/utils';
import { Bundle } from '../bundle.entity';

@InputType()
export class CreateBundleInput extends OmitType(Bundle, ['contents', 'type'] as const) {
    @Field(() => [IdOnlyEntity])
    contents: IdOnlyEntity[];
}
