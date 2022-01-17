import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content/content.entity';
import { ContentModule } from './content/content.module';
import { Movie } from './content/movie/movie.entity';
import { MovieModule } from './content/movie/movie.module';
// import { Content } from './content/entities/content.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            entities: [Content, Movie]
        }),
        GraphQLModule.forRoot({
            include: [ContentModule, MovieModule],
            autoSchemaFile: true
        }),
        ContentModule
    ]
})
export class AppModule {}
