import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { Content } from './content.entity';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Movie]), MovieModule],
    providers: [ContentResolver, ContentService]
})
export class ContentModule {}
