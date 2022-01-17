import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateMovieInput } from './dto/create-movie.input';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Resolver(() => Movie)
export class MovieResolver {
    constructor(private readonly movieService: MovieService) {}

    @Mutation(() => Movie)
    async createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
        return await this.movieService.create(createMovieInput);
    }

    @Query(() => [Movie], { name: 'movies' })
    findAll() {
        return this.movieService.findAll();
    }

    @Query(() => Movie, { name: 'movie' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.movieService.findOne(id);
    }

    // @Mutation(() => Movie)
    // updateMovie(
    //     @Args('updateMovieInput') updateMovieInput: UpdateMovieInput,
    // ) {
    //     return this.movieService.update(
    //         updateMovieInput.id,
    //         updateMovieInput,
    //     );
    // }

    @Mutation(() => Movie)
    removeMovie(@Args('id', { type: () => Int }) id: number) {
        return this.movieService.remove(id);
    }
}
