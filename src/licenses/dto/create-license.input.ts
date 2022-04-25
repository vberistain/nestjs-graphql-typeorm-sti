import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Content } from '../../contents/content.entity';
import { IdOnlyEntity } from '../../contents/playlists/dto/create-playlist.input';
import { License } from '../license.entity';

@InputType()
export class CreateLicenseInput extends OmitType(License, ['id', 'content']) {
    @Field(() => IdOnlyEntity)
    content: Pick<Content, 'id'>;
}
