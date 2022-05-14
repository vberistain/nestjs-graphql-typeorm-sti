import { GqlUserGuard } from './../security/auth/auth.guard';
import { Args, Context, Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Content } from './content.entity';
import { Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentUnion } from './content.type';

@Resolver(() => Content)
export class ContentsResolver {
    @Inject(ContentsService)
    private readonly contentsService: ContentsService;

    @Query(() => ContentUnion)
    async content(@Args('id', { type: () => Int }) id: number): Promise<typeof ContentUnion> {
        return this.contentsService.findOne(id);
    }

    @Query(() => [ContentUnion])
    // @UseGuards(GqlUserGuard)
    async contents(): Promise<typeof ContentUnion[]> {
        return this.contentsService.findAll();
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
