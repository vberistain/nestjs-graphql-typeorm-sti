import { InputType, OmitType } from '@nestjs/graphql';
import { Movie } from '../movie.entity';

@InputType()
export class CreateMovieInput extends OmitType(Movie, ["type"]) { }
