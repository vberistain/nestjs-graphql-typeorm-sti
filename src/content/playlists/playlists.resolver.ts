import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { Playlist } from './playlist.entity';
import { PlaylistsService } from './playlists.service';

@Resolver(() => Playlist)
export class PlaylistsResolver {
    constructor(private readonly playlistsService: PlaylistsService) { }

    @Mutation(() => Playlist)
    async createPlaylist(@Args('createPlaylistInput') createPlaylistInput: CreatePlaylistInput) {
        return await this.playlistsService.create(createPlaylistInput);
    }

    @Query(() => [Playlist], { name: 'playlists' })
    findAll() {
        return this.playlistsService.findAll();
    }

    @Query(() => Playlist, { name: 'playlist' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.playlistsService.findOne(id);
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
        return this.playlistsService.remove(id);
    }

    @Mutation(() => Playlist)
    addContentToPlaylist(@Args('playlistId', { type: () => Int }) playlistId: number, @Args('contentId', { type: () => Int }) contentId: number) {
        return this.playlistsService.addContent(playlistId, contentId);
    }
}
