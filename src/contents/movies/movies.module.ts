import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { MoviesResolver } from './movies.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaybacksModule } from '../../playbacks/playbacks.module';
import { PlaybacksService } from '../../playbacks/playbacks.service';
import { Playback } from '../../playbacks/playback.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movie, Playback]), PlaybacksModule],
    providers: [MoviesResolver, MoviesService, PlaybacksService]
})
export class MoviesModule {}
