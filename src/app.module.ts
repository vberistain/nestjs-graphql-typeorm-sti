import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import formatGraphQLError from './common/errors/graphql-error-formater';
import { Content } from './contents/content.entity';
import { ContentsModule } from './contents/contents.module';
import { Movie } from './contents/movies/movie.entity';
import { MoviesModule } from './contents/movies/movies.module';
import { Playlist } from './contents/playlists/playlist.entity';
import { PlaylistsModule } from './contents/playlists/playlists.module';
import { License } from './licenses/license.entity';
import { LicensesModule } from './licenses/licenses.module';
import { Playback } from './playbacks/playback.entity';
import { PlaybacksModule } from './playbacks/playbacks.module';
import { PlaybacksService } from './playbacks/playbacks.service';
import { AuthModule } from './security/auth/auth.module';
import { SecurityModule } from './security/security.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            username: 'root',
            password: 'root',
            port: 3306,
            database: 'ticket-app',
            entities: [Content, Movie, Playlist, Playback, License],
            synchronize: true,
            logging: false,
            migrations: ['dist/migrations/*.js']
        }),
        GraphQLModule.forRootAsync({
            imports: [PlaybacksModule],
            useFactory: () => ({
                include: [PlaylistsModule, MoviesModule, LicensesModule, PlaybacksModule, ContentsModule],
                autoSchemaFile: 'schema.graphql',
                formatError: formatGraphQLError,
                sortSchema: false,
                fieldResolverEnhancers: ['guards', 'interceptors', 'filters'],
                context: ({ req }) => ({
                    req
                })
            })
        }),
        ContentsModule,
        LicensesModule,
        PlaybacksModule,
        SecurityModule,
        AuthModule
    ]
})
export class AppModule {}
