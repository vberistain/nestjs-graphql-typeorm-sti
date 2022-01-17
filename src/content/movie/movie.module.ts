import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { MovieResolver } from './movie.resolver';
import { Content } from '../content.entity';

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [Content, Movie] })],
    providers: [MovieResolver, MovieService]
})
export class MovieModule {}
