import { CreatePlaybackInput } from './create-playback.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePlaybackInput extends PartialType(CreatePlaybackInput) {
    @Field(() => Int)
    id: number;
}
