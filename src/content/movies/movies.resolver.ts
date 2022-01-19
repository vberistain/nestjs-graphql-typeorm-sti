import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Resolver(() => Movie)
export class MoviesResolver {
    @Inject()
    private readonly moviesService: MoviesService;

    @Mutation(() => Movie)
    async createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
        return await this.moviesService.create(createMovieInput);
    }

    @Query(() => [Movie])
    findMovies() {
        return this.moviesService.findAll();
    }

    @Query(() => Movie)
    findMovie(@Args('id', { type: () => Int }) id: number) {
        return this.moviesService.findOne(id);
    }

    @Mutation(() => Movie)
    updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
        return this.moviesService.update(updateMovieInput.id, updateMovieInput);
    }

    @Mutation(() => Movie)
    removeMovie(@Args('id', { type: () => Int }) id: number) {
        return this.moviesService.remove(id);
    }
}
