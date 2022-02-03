import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Playback } from '../src/playbacks/playback.entity';
import { Connection, Repository } from 'typeorm';
import { createTestingAppModule } from './utils';
import playbackFixture from '../src/playbacks/fixtures/playback.fixture';
import { Movie } from '../src/contents/movies/movie.entity';
import { CreatePlaybackInput } from '../src/playbacks/dto/create-playback.input';
import { Livestream } from '../src/contents/livestreams/livestream.entity';
import { ContentType } from '../src/contents/content.entity';

const testPlayback: CreatePlaybackInput = {
    started: true,
    finished: false,
    duration: 1222,
    position: 12,
    userId: 12,
    content: {
        id: 1
    }
};
const testMovie: Movie = { ...playbackFixture.content, duration: 123 };

const testPlayback2: CreatePlaybackInput = {
    ...testPlayback,
    content: { id: 2 }
};
const testMovie2: Movie = { ...playbackFixture.content, id: 2, title: 'Movie2', duration: 123 };

describe('PlaybackResolver (e2e)', () => {
    let app: INestApplication;
    let module: TestingModule;
    let playbackRepository: Repository<Playback>;
    let movieRepository: Repository<Movie>;
    let livestreamRepository: Repository<Livestream>;
    let db: Connection;

    beforeAll(async () => {
        ({ app, module } = await createTestingAppModule());
        playbackRepository = module.get<Repository<Playback>>(getRepositoryToken(Playback));
        movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
        livestreamRepository = module.get<Repository<Livestream>>(getRepositoryToken(Livestream));
        db = app.get(Connection);
    });

    beforeEach(async () => {
        await db.synchronize(true);
    });

    afterAll(async () => {
        await app.close();
    });

    describe('createPlayback', () => {
        it('should create a new playback in the database', async () => {
            await movieRepository.save(testMovie);
            const mutation = gql`
                mutation {
                    createPlayback(
                        createPlaybackInput: { position: 123, duration: 223, finished: false, started: true, userId: 1, content: { id: 1 } }
                    ) {
                        id
                        duration
                        userId
                        position
                        finished
                        started
                        content {
                            id
                        }
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(mutation)
                });
            expect(res.body.data.createPlayback).toEqual({
                id: 1,
                duration: 223,
                userId: 1,
                position: 123,
                finished: false,
                started: true,
                content: { id: 1 }
            });

            const dbPlayback = await playbackRepository.findOne(1);
            expect(dbPlayback).toEqual(
                expect.objectContaining({
                    id: 1,
                    duration: 223,
                    userId: 1,
                    position: 123,
                    finished: false,
                    started: true
                })
            );
        });

        it('should throw a DUPLICATED_ENTITY error when playlist existing already for user/content', async () => {
            await movieRepository.save(testMovie);
            await playbackRepository.save(testPlayback);

            const mutation = gql`
                mutation {
                    createPlayback(
                        createPlaybackInput: { position: 123, duration: 223, finished: false, started: true, userId: 1, content: { id: 1 } }
                    ) {
                        id
                        duration
                        userId
                        position
                        finished
                        started
                        content {
                            id
                        }
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(mutation)
                });
            expect(res.body.errors[0]).toEqual(
                expect.objectContaining({
                    message: 'Duplicated Entity',
                    extensions: {
                        code: 'DUPLICATED_ENTITY'
                    }
                })
            );
        });

        it('should throw a RELATED_ENTITY_NOT_FOUND error when content not available', async () => {
            const mutation = gql`
                mutation {
                    createPlayback(
                        createPlaybackInput: { position: 123, duration: 223, finished: false, started: true, userId: 1, content: { id: 1 } }
                    ) {
                        id
                        duration
                        userId
                        position
                        finished
                        started
                        content {
                            id
                        }
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(mutation)
                });
            expect(res.body.errors[0]).toEqual(
                expect.objectContaining({
                    message: 'Related Entity Not Found',
                    extensions: {
                        code: 'RELATED_ENTITY_NOT_FOUND'
                    }
                })
            );
            const dbPlayback = await playbackRepository.findOne(1);
            expect(dbPlayback).toBeUndefined();
        });
    });

    describe('playbacks', () => {
        it('should return all playbacks', async () => {
            await movieRepository.save(testMovie);
            await movieRepository.save(testMovie2);
            await playbackRepository.save(testPlayback);
            await playbackRepository.save(testPlayback2);

            const query = gql`
                query {
                    playbacks {
                        id
                        duration
                        userId
                        position
                        content {
                            id
                            title
                        }
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.playbacks).toEqual([
                {
                    id: 1,
                    duration: testPlayback.duration,
                    userId: testPlayback.userId,
                    position: testPlayback.position,
                    content: {
                        id: testMovie.id,
                        title: testMovie.title
                    }
                },
                {
                    id: 2,
                    duration: testPlayback2.duration,
                    userId: testPlayback2.userId,
                    position: testPlayback2.position,
                    content: {
                        id: testMovie2.id,
                        title: testMovie2.title
                    }
                }
            ]);
        });

        it('should return an empty array when no playbacks in the database', async () => {
            const query = gql`
                query {
                    playbacks {
                        id
                        duration
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.playbacks).toEqual([]);
        });
    });

    describe('playback', () => {
        it('should return a specific playback', async () => {
            await movieRepository.save(testMovie);
            await playbackRepository.save(testPlayback);
            const query = gql`
                query {
                    playback(id: 1) {
                        id
                        duration
                        content {
                            id
                        }
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.playback).toEqual({
                id: 1,
                duration: testPlayback.duration,
                content: {
                    id: testMovie.id
                }
            });
        });

        it('should return a not found error', async () => {
            const query = gql`
                query {
                    playback(id: 1) {
                        id
                        duration
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });

            expect(res.body.errors[0]).toEqual(
                expect.objectContaining({
                    message: 'Entity Not Found',
                    extensions: {
                        code: 'ENTITY_NOT_FOUND'
                    }
                })
            );
        });

        it('should return a specific playback for a livestream', async () => {
            await livestreamRepository.save({ ...testMovie, type: ContentType.livestream });
            await playbackRepository.save(testPlayback);
            const query = gql`
                query {
                    playback(id: 1) {
                        id
                        duration
                        content {
                            id
                            type
                        }
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.playback).toEqual({
                id: 1,
                duration: testPlayback.duration,
                content: {
                    id: testMovie.id,
                    type: ContentType.livestream
                }
            });
        });
    });

    describe('updatePlayback', () => {
        it('should update a specific playback', async () => {
            await movieRepository.save(testMovie);
            await playbackRepository.save(testPlayback);

            const query = gql`
                mutation {
                    updatePlayback(id: 1, updatePlaybackInput: { position: 333 }) {
                        id
                        position
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.updatePlayback).toEqual({
                id: 1,
                position: 333
            });
        });

        it('should return a ENTITY_NOT_FOUND error when updating a playback that doesnt exist', async () => {
            const query = gql`
                mutation {
                    updatePlayback(id: 1, updatePlaybackInput: { duration: 333 }) {
                        id
                        duration
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });

            expect(res.body.errors[0]).toEqual(
                expect.objectContaining({
                    message: 'Entity Not Found',
                    extensions: {
                        code: 'ENTITY_NOT_FOUND'
                    }
                })
            );
        });

        it('should return a RELATED_ENTITY_NOT_FOUND error when updating a playback content which doesnt exist', async () => {
            await movieRepository.save(testMovie);
            await playbackRepository.save(testPlayback);

            const query = gql`
                mutation {
                    updatePlayback(id: 1, updatePlaybackInput: { content: { id: 2 } }) {
                        id
                        duration
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });

            expect(res.body.errors[0]).toEqual(
                expect.objectContaining({
                    message: 'Related Entity Not Found',
                    extensions: {
                        code: 'RELATED_ENTITY_NOT_FOUND'
                    }
                })
            );
        });
    });

    describe('removePlayback', () => {
        it('should remove a specific playback', async () => {
            await movieRepository.save(testMovie);
            await playbackRepository.save(testPlayback);

            const query = gql`
                mutation {
                    removePlayback(id: 1)
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.removePlayback).toEqual(true);

            const playback = await playbackRepository.findOne(1);
            expect(playback).toBeUndefined;
        });

        it('should return a not found error when removing a playback that doesnt exist', async () => {
            const query = gql`
                mutation {
                    removePlayback(id: 1)
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });

            expect(res.body.errors[0]).toEqual(
                expect.objectContaining({
                    message: 'Entity Not Found',
                    extensions: {
                        code: 'ENTITY_NOT_FOUND'
                    }
                })
            );
        });

        it('should not remove a content when deleting a playback', async () => {
            await movieRepository.save(testMovie);
            await playbackRepository.save(testPlayback);
            const query = gql`
                mutation {
                    removePlayback(id: 1)
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });

            expect(res.body.data.removePlayback).toEqual(true);

            expect(await movieRepository.findOne(1)).toBeDefined();
        });
    });
});
