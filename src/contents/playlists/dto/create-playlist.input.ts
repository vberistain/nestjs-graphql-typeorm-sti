import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IdOnlyEntity } from '@common/utils';
import { Playlist } from '../playlist.entity';
@InputType()
export class CreatePlaylistInput extends OmitType(Playlist, ['contents', 'inContents', 'type', 'licenses', 'license'] as const, InputType) {
    @Field(() => [IdOnlyEntity])
    contents?: IdOnlyEntity[];
}
