import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { ContentsService } from './contents.service';
import { ContentsResolver } from './contents.resolver';
import { ContentController } from './contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { Playlist } from './playlists/playlist.entity';
import { Playback } from '../playbacks/playback.entity';
import { License } from '../licenses/license.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Playlist, Playback, License]), MoviesModule, PlaylistsModule],
    providers: [ContentsResolver, ContentsService],
    controllers: [ContentController]
})
export class ContentsModule {}
