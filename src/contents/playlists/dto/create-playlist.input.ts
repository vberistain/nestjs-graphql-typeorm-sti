import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { Playlist } from '../playlist.entity';

@InputType()
export class IdOnlyEntity {
    @Field(() => Int)
    id: number;
}

@InputType()
export class CreatePlaylistInput extends OmitType(Playlist, ['contents', 'license'] as const) {
    @Field(() => [IdOnlyEntity])
    contents: IdOnlyEntity[];
    @Field(() => IdOnlyEntity, { nullable: true })
    license?: IdOnlyEntity;
}
