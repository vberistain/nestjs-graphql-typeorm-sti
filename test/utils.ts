import { INestApplication, LoggerService } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions, Repository } from 'typeorm';
import formatGraphQLError from '../src/common/errors/graphql-error-formater';
import { Content } from '../src/content/content.entity';
import { ContentsModule } from '../src/content/contents.module';
import { Livestream } from '../src/content/livestream/livestream.entity';
import { LivestreamsModule } from '../src/content/livestream/livestream.module';
import { Movie } from '../src/content/movies/movie.entity';
import { MoviesModule } from '../src/content/movies/movies.module';
import { Playlist } from '../src/content/playlists/playlist.entity';
import { PlaylistsModule } from '../src/content/playlists/playlists.module';
import { License } from '../src/licenses/license.entity';
import { LicensesModule } from '../src/licenses/licenses.module';
import { Playback } from '../src/playbacks/playback.entity';
import { PlaybacksModule } from '../src/playbacks/playbacks.module';

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};

export function repositoryMockFactory(fixture): () => MockType<Partial<Repository<any>>> {
    return jest.fn(() => ({
        findOne: jest.fn(async (id: any) => fixture),
        update: jest.fn(async (id: any, fixture: any) => fixture),
        find: jest.fn(async () => [fixture]),
        save: jest.fn(async (entity: any) => entity),
        delete: jest.fn(async (id: any) => ({ raw: {} }))
    }));
}

export function serviceMockFactory(fixture: any) {
    return jest.fn(() => ({
        findOne: jest.fn(async (id: number) => fixture),
        findAll: jest.fn(async () => [fixture]),
        update: jest.fn(async (id: number, updateData: any) => fixture),
        create: jest.fn(async (entity: any) => entity),
        remove: jest.fn(async (id: number) => {})
    }));
}

class NoLogger implements LoggerService {
    log(message: any, ...optionalParams: any[]) {}
    error(message: any, ...optionalParams: any[]) {}
    warn(message: any, ...optionalParams: any[]) {}
    debug?(message: any, ...optionalParams: any[]) {}
    verbose?(message: any, ...optionalParams: any[]) {}
}

export async function createTestingAppModule(): Promise<{ app: INestApplication; module: TestingModule }> {
    const module = await Test.createTestingModule({
        imports: [
            TypeOrmModule.forRootAsync({
                useFactory: async () =>
                    Object.assign(await getConnectionOptions(), {
                        type: 'mysql',
                        database: 'ticket-app-test',
                        synchronize: true,
                        dropSchema: true,
                        entities: [Movie, License, Playlist, Playback, Content, Livestream]
                    })
            }),

            GraphQLModule.forRoot({
                include: [PlaylistsModule, MoviesModule, LicensesModule, PlaybacksModule, LivestreamsModule],
                autoSchemaFile: true,
                playground: false,
                formatError: formatGraphQLError
            }),
            ContentsModule,
            PlaylistsModule,
            MoviesModule,
            LivestreamsModule,
            LicensesModule,
            PlaybacksModule
        ]
    })
        .setLogger(new NoLogger())
        .compile();
    let app = module.createNestApplication();
    await app.init();

    return { app, module };
}
