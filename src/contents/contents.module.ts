import { Module } from '@nestjs/common';
import { Content } from './content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { LivestreamsModule } from './livestreams/livestream.module';
import { ContentsService } from './contents.service';
import { ContentsResolver } from './contents.resolver';
import { Livestream } from './livestreams/livestream.entity';
import { Movie } from './movies/movie.entity';
import { Playlist } from './playlists/playlist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Livestream, Movie, Playlist]), MoviesModule, PlaylistsModule, LivestreamsModule],
    providers: [ContentsResolver, ContentsService]
})
export class ContentsModule {}
