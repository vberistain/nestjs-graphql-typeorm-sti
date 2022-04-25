import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { BaseResolver } from '@common/base/base.resolver';
import { CustomErrorFilter } from '@common/errors/custom-error.filter';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GqlUserGuard, User } from '@security/auth/auth.guard';
import { UserPayload } from '@security/auth/user-payload';

@Resolver(() => Movie)
@UseFilters(new CustomErrorFilter())
export class MoviesResolver extends BaseResolver(Movie, CreateMovieInput, UpdateMovieInput) {
    constructor(private readonly moviesService: MoviesService) {
        super(moviesService);
    }

    @Query(() => Movie, { name: `movie` })
    @UseGuards(GqlUserGuard)
    async findOne(@Args('id', { type: () => Int }) id: number, @User() user?: UserPayload): Promise<Movie> {
        return this.moviesService.findOne(id, {}, ['playbacks', 'licenses'], user?.userId);
    }

    @Query(() => [Movie], { name: `movies` })
    @UseGuards(GqlUserGuard)
    async findAll(@User() user?: UserPayload): Promise<Movie[]> {
        return this.moviesService.findAll({}, ['playbacks', 'licenses', 'playlists'], user?.userId);
    }

    @Mutation(() => Movie, { name: `createMovie` })
    async create(@Args(`createMovieInput`) createInput: CreateMovieInput): Promise<Movie> {
        return await this.moviesService.create(createInput);
    }
}
