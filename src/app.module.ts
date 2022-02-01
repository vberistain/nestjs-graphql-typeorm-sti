import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import formatGraphQLError from './common/errors/graphql-error-formater';
import { ContentsModule } from './content/contents.module';
import { MoviesModule } from './content/movies/movies.module';
import { PlaylistsModule } from './content/playlists/playlists.module';
import { LicensesModule } from './licenses/licenses.module';
import { PlaybacksModule } from './playbacks/playbacks.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({}),
        GraphQLModule.forRoot({
            include: [PlaylistsModule, MoviesModule, LicensesModule, PlaybacksModule],
            autoSchemaFile: true,
            formatError: formatGraphQLError
        }),
        ContentsModule,
        PlaylistsModule,
        MoviesModule,
        LicensesModule,
        PlaybacksModule
    ]
})
export class AppModule {}
