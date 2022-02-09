import { Module } from '@nestjs/common';
import { Content } from './content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { ContentsService } from './contents.service';
import { ContentsResolver } from './contents.resolver';
import { Movie } from './movies/movie.entity';
import { Playlist } from './playlists/playlist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Movie, Playlist]), MoviesModule, PlaylistsModule],
    providers: [ContentsResolver, ContentsService]
})
export class ContentsModule {}
