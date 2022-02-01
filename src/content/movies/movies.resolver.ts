import { Inject, UseFilters } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EntityNotFoundError } from '@customErrors';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { CustomErrorFilter } from '@common/errors/custom-error.filter';

@Resolver(() => Movie)
@UseFilters(new CustomErrorFilter())
export class MoviesResolver {
    @Inject()
    private readonly moviesService: MoviesService;

    @Mutation(() => Movie)
    async createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput): Promise<Movie> {
        return await this.moviesService.create(createMovieInput);
    }

    @Query(() => [Movie])
    movies(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @Query(() => Movie)
    async movie(@Args('id', { type: () => Int }) id: number): Promise<Movie> {
        const res = await this.moviesService.findOne(id);
        if (!res) {
            throw new EntityNotFoundError('Movie Not Found');
        }
        return res;
    }
    @Mutation(() => Movie)
    async updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput): Promise<Movie> {
        return await this.moviesService.update(updateMovieInput.id, updateMovieInput);
    }

    @Mutation(() => Movie)
    async removeMovie(@Args('id', { type: () => Int }) id: number): Promise<void> {
        await this.moviesService.remove(id);
    }
}
