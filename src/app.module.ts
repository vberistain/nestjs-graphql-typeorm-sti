import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import formatGraphQLError from './common/errors/graphql-error-formater';
import { ContentsModule } from './contents/contents.module';
import { MoviesModule } from './contents/movies/movies.module';
import { PlaylistsModule } from './contents/playlists/playlists.module';
import { LicensesModule } from './licenses/licenses.module';
import { createPlaybackLoader } from './playbacks/playback.loader';
import { PlaybacksModule } from './playbacks/playbacks.module';
import { PlaybacksService } from './playbacks/playbacks.service';
import { AuthModule } from './security/auth/auth.module';
import { SecurityModule } from './security/security.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({}),
        GraphQLModule.forRootAsync({
            imports: [PlaybacksModule],
            useFactory: (playbacksService: PlaybacksService) => ({
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
