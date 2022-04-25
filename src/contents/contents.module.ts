import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { ContentsService } from './contents.service';
import { ContentsResolver } from './contents.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { Playlist } from './playlists/playlist.entity';
import { Playback } from '../playbacks/playback.entity';
import { License } from '../licenses/license.entity';
import { BundlesModule } from './bundles/bundles.module';
import { Bundle } from './bundles/bundle.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Playlist, Playback, License, Bundle]), MoviesModule, PlaylistsModule, BundlesModule],
    providers: [ContentsResolver, ContentsService]
})
export class ContentsModule {}
