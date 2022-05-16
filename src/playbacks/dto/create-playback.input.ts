import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IdOnlyEntity } from '@common/utils';
import { Playback } from '../playback.entity';

@InputType()
export class CreatePlaybackInput extends OmitType(Playback, ['id', 'content', 'createdAt', 'updatedAt', 'setStarted'] as const, InputType) {
    @Field(() => IdOnlyEntity)
    content: IdOnlyEntity;
}
