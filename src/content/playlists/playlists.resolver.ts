import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import { Playlist } from './playlist.entity';
import { PlaylistsService } from './playlists.service';

@Resolver(() => Playlist)
export class PlaylistsResolver {
    @Inject()
    private readonly playlistsService: PlaylistsService;

    @Mutation(() => Playlist)
    async createPlaylist(@Args('createPlaylistInput') createPlaylistInput: CreatePlaylistInput) {
        return await this.playlistsService.create(createPlaylistInput);
    }

    @Query(() => [Playlist], { name: 'playlists' })
    findPlaylists() {
        return this.playlistsService.findAll();
    }

    @Query(() => Playlist, { name: 'playlist' })
    findPlaylist(@Args('id', { type: () => Int }) id: number) {
        return this.playlistsService.findOne(id);
    }

    @Mutation(() => Playlist)
    updatePlaylist(@Args('updatePlaylistInput') updatePlaylistInput: UpdatePlaylistInput) {
        return this.playlistsService.update(updatePlaylistInput.id, updatePlaylistInput);
    }

    @Mutation(() => Playlist)
    removePlaylist(@Args('id', { type: () => Int }) id: number) {
        return this.playlistsService.remove(id);
    }
}
