import { InputType, OmitType } from '@nestjs/graphql';
import { Content } from '../../content/content.entity';
import { Playback } from '../playback.entity';

@InputType()
export class CreatePlaybackInput extends OmitType(Playback, ['content', 'createdAt', 'updatedAt']) {
    content: Pick<Content, 'id'>;
}
