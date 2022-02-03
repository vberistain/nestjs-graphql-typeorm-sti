import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import formatGraphQLError from './common/errors/graphql-error-formater';
import { ContentsModule } from './contents/contents.module';
import { LivestreamsModule } from './contents/livestreams/livestream.module';
import { MoviesModule } from './contents/movies/movies.module';
import { PlaylistsModule } from './contents/playlists/playlists.module';
import { LicensesModule } from './licenses/licenses.module';
import { PlaybacksModule } from './playbacks/playbacks.module';
import { AuthModule } from './security/auth/auth.module';
import { SecurityModule } from './security/security.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({}),
        GraphQLModule.forRoot({
            include: [PlaylistsModule, MoviesModule, LicensesModule, PlaybacksModule, LivestreamsModule, ContentsModule],
            autoSchemaFile: 'schema.graphql',
            formatError: formatGraphQLError,
            sortSchema: false,
            context: ({ req }) => ({ req })
        }),
        ContentsModule,
        PlaylistsModule,
        LivestreamsModule,
        MoviesModule,
        LicensesModule,
        PlaybacksModule,
        AuthModule,
        SecurityModule
    ]
})
export class AppModule {}
