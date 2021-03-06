import { GqlUserGuard, User } from './../security/auth/auth.guard';
import { Args, Context, Info, Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Content } from './content.entity';
import { Query } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentUnion } from './content.types';
import { UserPayload } from '../security/auth/user-payload';
import { GraphQLResolveInfo } from 'graphql';
import { getRelations } from '../common/graphql-utils';

@Resolver(() => Content)
export class ContentsResolver {
    @Inject(ContentsService)
    private readonly contentsService: ContentsService;

    @Query(() => ContentUnion)
    async content(@Args('id', { type: () => Int }) id: number, @Info() info: GraphQLResolveInfo): Promise<typeof ContentUnion> {
        return this.contentsService.findOne(id, {}, getRelations(info));
    }

    @Query(() => [ContentUnion])
    @UseGuards(GqlUserGuard)
    async contents(@Info() info: GraphQLResolveInfo, @User() user?: UserPayload): Promise<typeof ContentUnion[]> {
        return this.contentsService.findAll({}, getRelations(info));
    }

    // @ResolveField(() => Playback, { nullable: true })
    // async playback(
    //     @Parent() content: typeof ContentUnion,
    //     @User() user: UserPayload,
    //     @Context('playbackLoader') playbackLoader: DataLoader<{ id: number; userId: number }, Playback>
    // ) {
    //     if (user) {
    //         return playbackLoader.load({ id: content.id, userId: user.userId });
    //     } else {
    //         throw new ApolloError('Unauthorized. Please attach user token to get user playbacks', 'UNAUTHORIZED');
    //     }
    // }
}
