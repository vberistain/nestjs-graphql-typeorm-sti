import { InputType } from '@nestjs/graphql';
import { Movie } from '../movie.entity';

@InputType()
export class CreateMovieInput extends Movie {}
