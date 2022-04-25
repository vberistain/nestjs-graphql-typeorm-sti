import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { MoviesResolver } from './movies.resolver';
import { Content } from '../content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playback } from '../../playbacks/playback.entity';
import { License } from '../../licenses/license.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
    providers: [MoviesResolver, MoviesService]
})
export class MoviesModule {}
