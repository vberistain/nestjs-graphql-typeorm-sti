import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { MovieResolver } from './movie.resolver';
import { Content } from '../content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Movie])],
    providers: [MovieResolver, MovieService]
})
export class MovieModule {}
