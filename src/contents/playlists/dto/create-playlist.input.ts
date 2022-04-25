import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { Playlist } from '../playlist.entity';

@InputType()
export class IdOnlyEntity {
    @Field(() => Int)
    id: number;
}

@InputType()
export class CreatePlaylistInput extends OmitType(Playlist, ['contents', 'type', 'licenses', 'license', 'setLicense'] as const) {
    @Field(() => [IdOnlyEntity])
    contents: IdOnlyEntity[];
}
