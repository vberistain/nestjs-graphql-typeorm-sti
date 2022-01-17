import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Content } from './content.entity';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/movie.entity';

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [Content, Movie] }), MovieModule],
    providers: [ContentResolver, ContentService]
})
export class ContentModule {}
