import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { EntityNotFoundError } from '@commonErrors';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Resolver(() => Movie)
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
            throw new ApolloError('Movie Not Found', 'NOT_FOUND');
        }
        return res;
    }

    @Mutation(() => Movie)
    async updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput): Promise<Movie> {
        try {
            return await this.moviesService.update(updateMovieInput.id, updateMovieInput);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new ApolloError('Movie Not Found', 'NOT_FOUND');
            }
        }
    }

    @Mutation(() => Movie)
    async removeMovie(@Args('id', { type: () => Int }) id: number): Promise<void> {
        await this.moviesService.remove(id);
    }
}
