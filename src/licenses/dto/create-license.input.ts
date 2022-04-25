import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IdOnlyEntity } from '@common/utils';
import { Content } from '../../contents/content.entity';
import { License } from '../license.entity';

@InputType()
export class CreateLicenseInput extends OmitType(License, ['id', 'content']) {
    @Field(() => IdOnlyEntity)
    content: Pick<Content, 'id'>;
}
