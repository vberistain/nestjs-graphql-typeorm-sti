import { INestApplication, LoggerService } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Bundle } from '../src/contents/bundles/bundle.entity';
import formatGraphQLError from '@common/errors/graphql-error-formater';
import { Content } from '../src/contents/content.entity';
import { ContentsModule } from '../src/contents/contents.module';
import { Movie } from '../src/contents/movies/movie.entity';
import { MoviesModule } from '../src/contents/movies/movies.module';
import { Playlist } from '../src/contents/playlists/playlist.entity';
import { PlaylistsModule } from '../src/contents/playlists/playlists.module';
import { License } from '../src/licenses/license.entity';
import { LicensesModule } from '../src/licenses/licenses.module';
import { Playback } from '../src/playbacks/playback.entity';
import { PlaybacksModule } from '../src/playbacks/playbacks.module';
import { AuthModule } from '../src/security/auth/auth.module';
import { SecurityModule } from '../src/security/security.module';
import { MovieSubscriber } from '../src/contents/movies/movie.subscriber';
import { ContentSubscriber } from '../src/contents/content.subscriber';
import { BundlesModule } from '../src/contents/bundles/bundles.module';

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};

export const repositorySpies = {
    findOne: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    insert: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: {
        offset: jest.fn(),
        limit: jest.fn(),
        where: jest.fn(),
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest.fn(),
        getOne: jest.fn()
    },
    resetSpies: () => {
        repositorySpies.findOne.mockClear();
        repositorySpies.update.mockClear();
        repositorySpies.insert.mockClear();
        repositorySpies.find.mockClear();
        repositorySpies.save.mockClear();
        repositorySpies.delete.mockClear();
        repositorySpies.createQueryBuilder.offset.mockClear();
        repositorySpies.createQueryBuilder.limit.mockClear();
        repositorySpies.createQueryBuilder.where.mockClear();
        repositorySpies.createQueryBuilder.andWhere.mockClear();
        repositorySpies.createQueryBuilder.leftJoinAndSelect.mockClear();
        repositorySpies.createQueryBuilder.getMany.mockClear();
        repositorySpies.createQueryBuilder.getOne.mockClear();
    }
};

export function repositoryMockFactory(fixture): () => MockType<Partial<Repository<typeof fixture>>> {
    return jest.fn(() => ({
        findOne: repositorySpies.findOne.mockResolvedValue(fixture),
        update: repositorySpies.update.mockResolvedValue(fixture),
        find: repositorySpies.find.mockResolvedValue([fixture]),
        save: repositorySpies.save.mockImplementation(async (a) => a),
        insert: repositorySpies.insert.mockResolvedValue(fixture),
        delete: repositorySpies.delete.mockResolvedValue({ raw: {} }),
        createQueryBuilder: jest.fn(() => ({
            offset: repositorySpies.createQueryBuilder.offset.mockReturnThis(),
            limit: repositorySpies.createQueryBuilder.limit.mockReturnThis(),
            where: repositorySpies.createQueryBuilder.where.mockReturnThis(),
            andWhere: repositorySpies.createQueryBuilder.andWhere.mockReturnThis(),
            leftJoinAndSelect: repositorySpies.createQueryBuilder.leftJoinAndSelect.mockReturnThis(),
            getMany: repositorySpies.createQueryBuilder.getMany.mockReturnValue([fixture]),
            getOne: repositorySpies.createQueryBuilder.getOne.mockReturnValue(fixture)
        }))
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

export class NoLogger implements LoggerService {
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
                useFactory: async () => ({
                    type: 'mysql',
                    host: '127.0.0.1',
                    username: 'root',
                    password: 'root',
                    port: 3306,
                    database: 'ticket-app-test',
                    synchronize: true,
                    migrationsRun: false,
                    dropSchema: false,
                    entities: [Content, Movie, Playlist, Playback, License, Bundle],
                    subscribers: [MovieSubscriber, ContentSubscriber]
                })
            }),

            GraphQLModule.forRoot({
                include: [PlaylistsModule, MoviesModule, LicensesModule, PlaybacksModule, BundlesModule, ContentsModule],
                autoSchemaFile: true,
                playground: false,
                formatError: formatGraphQLError,
                sortSchema: false,
                fieldResolverEnhancers: ['guards', 'interceptors', 'filters'],
                context: ({ req }) => ({
                    req
                })
            }),
            ContentsModule,
            LicensesModule,
            PlaybacksModule,
            SecurityModule,
            AuthModule
        ]
    })
        // .setLogger(new NoLogger())
        .compile();
    let app = module.createNestApplication();
    await app.init();

    return { app, module };
}

export async function clearDB(db: DataSource) {
    const entities = db.entityMetadatas;
    try {
        await db.query(`SET FOREIGN_KEY_CHECKS=0;`);
        for (const entity of entities) {
            const repository = await db.getRepository(entity.name);
            await repository.query(`TRUNCATE ${entity.tableName};`);
        }
        await db.query(`SET FOREIGN_KEY_CHECKS=1;`);
    } catch (e) {
        throw e;
    }
}
