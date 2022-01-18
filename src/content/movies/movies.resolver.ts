import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateMovieInput } from './dto/create-movie.input';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Resolver(() => Movie)
export class MoviesResolver {
    constructor(private readonly moviesService: MoviesService) { }

    @Mutation(() => Movie)
    async createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
        return await this.moviesService.create(createMovieInput);
    }

    @Query(() => [Movie], { name: 'movies' })
    findAll() {
        return this.moviesService.findAll();
    }

    @Query(() => Movie, { name: 'movie' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.moviesService.findOne(id);
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
        return this.moviesService.remove(id);
    }
}
