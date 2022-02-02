import { CreatePlaybackInput } from './create-playback.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePlaybackInput extends PartialType(CreatePlaybackInput) {}
