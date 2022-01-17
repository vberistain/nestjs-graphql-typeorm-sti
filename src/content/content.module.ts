import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { Content } from './content.entity';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist/playlist.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { Livestream } from './livestream/livestream.entity';
import { LivestreamModule } from './livestream/livestream.module';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Playlist, Movie, Livestream]), PlaylistModule, LivestreamModule, MovieModule],
    providers: [ContentResolver, ContentService]
})
export class ContentModule { }
