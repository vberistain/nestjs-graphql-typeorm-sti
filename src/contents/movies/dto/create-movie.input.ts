import { InputType, OmitType } from '@nestjs/graphql';
import { License } from '../../../licenses/license.entity';
import { Movie } from '../movie.entity';

@InputType()
export class CreateMovieInput extends OmitType(Movie, ['license']) {
    license?: Pick<License, 'id'>;
}
