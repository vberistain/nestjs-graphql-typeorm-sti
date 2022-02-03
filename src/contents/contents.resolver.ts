import { Args, createUnionType, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Content, ContentType } from './content.entity';
import { Query } from '@nestjs/graphql';
import { Playlist } from './playlists/playlist.entity';
import { Movie } from './movies/movie.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { Livestream } from './livestreams/livestream.entity';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.guard';
import { UserPayload } from '../auth/user-payload.entity';
import { Auth } from '../auth/auth.decorator';

export const ContentUnion = createUnionType({
    name: 'ContentUnion', // the name of the GraphQL union
    types: () => [Livestream, Movie, Playlist], // function that returns tuple of object types classes,
    resolveType(content: any) {
        if (content.type === ContentType.movie) {
            return Movie;
        }
        if (content.type === ContentType.livestream) {
            return Livestream;
        }
        if (content.type === ContentType.playlist) {
            return Playlist;
        }
        return null;
    }
});

@Resolver(() => Content)
export class ContentsResolver {
    @Inject(ContentsService)
    private readonly contentsService: ContentsService;

    @Query(() => ContentUnion)
    async content(@Args('id', { type: () => Int }) id: number): Promise<typeof ContentUnion> {
        return this.contentsService.findOne(id);
    }

    @Query(() => [ContentUnion])
    @Auth()
    async contents(@CurrentUser() user: UserPayload): Promise<typeof ContentUnion[]> {
        console.log(user);
        return this.contentsService.findAll();
    }
}
