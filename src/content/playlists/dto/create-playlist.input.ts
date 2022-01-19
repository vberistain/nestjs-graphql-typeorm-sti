import { InputType, OmitType } from '@nestjs/graphql';
import { License } from '../../../licenses/license.entity';
import { Content } from '../../content.entity';
import { Playlist } from '../playlist.entity';

@InputType()
export class CreatePlaylistInput extends OmitType(Playlist, ['contents', 'license'] as const) {
    contents: Pick<Content, 'id'>[];
    license?: Pick<License, 'id'>;
}
