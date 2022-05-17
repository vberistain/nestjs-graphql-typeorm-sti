import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { IdOnlyEntity } from '../../../common/utils';
import { Movie } from '../movie.entity';

@InputType('CreateMovieInput')
export class CreateMovieInput extends OmitType(Movie, ['type', 'inContents', 'license', 'playback'] as const, InputType) {
    @Field(() => [IdOnlyEntity], { nullable: true })
    inContents?: IdOnlyEntity[];
}
