import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content/content.entity';
import { ContentModule } from './content/content.module';
import { Livestream } from './content/livestream/livestream.entity';
import { LivestreamModule } from './content/livestream/livestream.module';
import { Movie } from './content/movie/movie.entity';
import { MovieModule } from './content/movie/movie.module';
import { Playlist } from './content/playlist/playlist.entity';
import { PlaylistModule } from './content/playlist/playlist.module';
// import { Content } from './content/entities/content.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            entities: [Content, Playlist, Movie, Livestream]
        }),
        GraphQLModule.forRoot({
            include: [ContentModule, PlaylistModule, MovieModule, LivestreamModule],
            autoSchemaFile: true
        }),
        ContentModule
    ]
})
export class AppModule { }
