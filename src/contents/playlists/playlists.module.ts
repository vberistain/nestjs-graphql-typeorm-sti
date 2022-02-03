import { Module } from '@nestjs/common';
import { Content } from '../content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { PlaylistsService } from './playlists.service';
import { PlaylistsResolver } from './playlists.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Playlist])],
    providers: [PlaylistsResolver, PlaylistsService]
})
export class PlaylistsModule {}
