import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';

@Resolver(() => Playlist)
export class PlaylistResolver {
    constructor(private readonly playlistService: PlaylistService) {}

    @Mutation(() => Playlist)
    async createPlaylist(@Args('createPlaylistInput') createPlaylistInput: CreatePlaylistInput) {
        return await this.playlistService.create(createPlaylistInput);
    }

    @Query(() => [Playlist], { name: 'playlists' })
    findAll() {
        return this.playlistService.findAll();
    }

    @Query(() => Playlist, { name: 'playlist' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.playlistService.findOne(id);
    }

    // @Mutation(() => Playlist)
    // updatePlaylist(
    //     @Args('updatePlaylistInput') updatePlaylistInput: UpdatePlaylistInput,
    // ) {
    //     return this.playlistService.update(
    //         updatePlaylistInput.id,
    //         updatePlaylistInput,
    //     );
    // }

    @Mutation(() => Playlist)
    removePlaylist(@Args('id', { type: () => Int }) id: number) {
        return this.playlistService.remove(id);
    }
}
