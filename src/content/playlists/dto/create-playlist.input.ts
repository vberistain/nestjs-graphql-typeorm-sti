import { InputType, OmitType } from '@nestjs/graphql';
import { Playlist } from '../playlist.entity';

@InputType()
export class CreatePlaylistInput extends OmitType(Playlist, ['type', "contents"] as const) { }
