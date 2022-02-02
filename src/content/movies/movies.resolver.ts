import { Resolver } from '@nestjs/graphql';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { BaseResolver } from '../../common/base/base.resolver';

@Resolver(() => Movie)
export class MoviesResolver extends BaseResolver(Movie, CreateMovieInput, UpdateMovieInput) {
    constructor(private readonly moviesService: MoviesService) {
        super(moviesService);
    }
}
