import { Args, Mutation, Resolver, Query, Int, Context, ResolveField, Parent, Info } from '@nestjs/graphql';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { BaseResolver } from '@common/base/base.resolver';
import { CustomErrorFilter } from '@common/errors/custom-error.filter';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GqlUserGuard, User } from '@security/auth/auth.guard';
import { UserPayload } from '@security/auth/user-payload';
import { PlaybacksService } from '../../playbacks/playbacks.service';
import { GraphQLResolveInfo } from 'graphql';
import { Relations } from '@common/graphql-utils';

@Resolver(() => Movie)
@UseFilters(new CustomErrorFilter())
export class MoviesResolver extends BaseResolver(Movie, CreateMovieInput, UpdateMovieInput) {
    constructor(private readonly moviesService: MoviesService, private readonly playbackService: PlaybacksService) {
        super(moviesService);
    }

    @Query(() => Movie, { name: `movie` })
    @UseGuards(GqlUserGuard)
    async findOne(
        @Args('id', { type: () => Int }) id: number,
        @Relations() relations: string[],
        @User() user?: UserPayload
    ): Promise<Movie> {
        return this.moviesService.findOne(id, {}, relations, user?.userId);
    }

    @Query(() => [Movie], { name: `movies` })
    @UseGuards(GqlUserGuard)
    async findAll(@Relations() relations: string[], @User() user?: UserPayload): Promise<Movie[]> {
        return this.moviesService.findAll({}, relations, user?.userId);
    }

    @Mutation(() => Movie, { name: `createMovie` })
    async create(@Args(`createMovieInput`) createInput: CreateMovieInput): Promise<Movie> {
        return await this.moviesService.create(createInput);
    }

    // @ResolveField('playback', () => Playback)
    // async getPlayback(@Parent() movie: Movie, @User() user?: UserPayload) {
    //     const { id } = movie;
    //     const res = await this.playbackService.findAll({ content: { id }, userId: user.userId });
    //     return res[0];
    // }
}
