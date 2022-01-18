import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content/content.entity';
import { ContentsModule } from './content/contents.module';
import { Movie } from './content/movies/movie.entity';
import { MoviesModule } from './content/movies/movies.module';
import { Playlist } from './content/playlists/playlist.entity';
import { PlaylistsModule } from './content/playlists/playlists.module';
import { LicensesModule } from './licenses/licenses.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            entities: [Content, Playlist, Movie]
        }),
        GraphQLModule.forRoot({
            include: [PlaylistsModule, MoviesModule],
            autoSchemaFile: true
        }),
        ContentsModule,
        PlaylistsModule,
        MoviesModule,
        LicensesModule,
    ]
})
export class AppModule { }
