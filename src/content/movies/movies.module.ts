import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { MoviesResolver } from './movies.resolver';
import { Content } from '../content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseService } from '../../common/base/base.service';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Movie])],
    providers: [MoviesResolver, MoviesService]
})
export class MoviesModule {}
