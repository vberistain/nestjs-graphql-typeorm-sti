import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { IBundle } from './bundle.interface';
import { AuthService } from '@security/auth/auth.service';
import { Bundle } from './bundle.entity';
import { clearDB, createTestingAppModule } from '@test/utils';
import { IMovie } from '../movies/movie.interface';
import { Movie } from '../movies/movie.entity';
import { IPlaylist } from '../playlists/playlist.interface';
import { Playlist } from '../playlists/playlist.entity';
import { ContentType } from '../content.interface';
import movieFixture from '../movies/fixtures/movie.fixture';
import playlistFixture from '../playlists/fixtures/playlist.fixture';
import bundleFixture from './fixtures/playlist.fixture';

const testMovie: IMovie = {
    ...movieFixture,
    id: 1,
    title: 'Matrix',
    description: 'Matrix description',
    duration: 123
};

const testMovie2: IMovie = {
    ...movieFixture,
    id: 2,
    title: 'Interstellar',
    description: 'Interstellar description',
    duration: 321
};

const testPlaylist: IPlaylist = {
    ...playlistFixture,
    id: 5,
    title: 'Playlist',
    description: 'Playlist',
    contents: [testMovie]
};

const testBundle: IBundle = {
    ...bundleFixture,
    id: 3,
    title: 'Best movies',
    description: 'Best movies of all time',
    contents: [testMovie, testMovie2]
};

const testBundle2: IBundle = {
    ...bundleFixture,
    id: 4,
    title: 'Best movies 2',
    description: 'Best movies of all time 2',
    contents: [testMovie, testMovie2]
};

const apiTestBundle = {
    ...testBundle,
    rentablePeriod: {
        start: testBundle.rentablePeriod.start.toISOString(),
        end: testBundle.rentablePeriod.end.toISOString()
    },
    availability: {
        start: testBundle.availability.start.toISOString(),
        end: testBundle.availability.end.toISOString()
    },
    contents: [
        {
            ...testMovie,
            rentablePeriod: {
                start: testMovie.rentablePeriod.start.toISOString(),
                end: testMovie.rentablePeriod.end.toISOString()
            },
            availability: {
                start: testMovie.availability.start.toISOString(),
                end: testMovie.availability.end.toISOString()
            }
        },
        {
            ...testMovie2,
            rentablePeriod: {
                start: testMovie2.rentablePeriod.start.toISOString(),
                end: testMovie2.rentablePeriod.end.toISOString()
            },
            availability: {
                start: testMovie2.availability.start.toISOString(),
                end: testMovie2.availability.end.toISOString()
            }
        }
    ]
};

const apiTestBundle2 = {
    ...testBundle2,
    rentablePeriod: {
        start: testBundle2.rentablePeriod.start.toISOString(),
        end: testBundle2.rentablePeriod.end.toISOString()
    },
    availability: {
        start: testBundle2.availability.start.toISOString(),
        end: testBundle2.availability.end.toISOString()
    },
    contents: [
        {
            ...testMovie,
            rentablePeriod: {
                start: testMovie.rentablePeriod.start.toISOString(),
                end: testMovie.rentablePeriod.end.toISOString()
            },
            availability: {
                start: testMovie.availability.start.toISOString(),
                end: testMovie.availability.end.toISOString()
            }
        },
        {
            ...testMovie2,
            rentablePeriod: {
                start: testMovie2.rentablePeriod.start.toISOString(),
                end: testMovie2.rentablePeriod.end.toISOString()
            },
            availability: {
                start: testMovie2.availability.start.toISOString(),
                end: testMovie2.availability.end.toISOString()
            }
        }
    ]
};

describe('BundleResolver (e2e)', () => {
    let app: INestApplication;
    let module: TestingModule;
    let movieRepository: Repository<Movie>;
    let bundleRepository: Repository<Bundle>;
    let playlistRepository: Repository<Playlist>;
    let authService: AuthService;
    let db: DataSource;

    beforeAll(async () => {
        ({ app, module } = await createTestingAppModule());
        bundleRepository = module.get(getRepositoryToken(Bundle));
        movieRepository = module.get(getRepositoryToken(Movie));
        playlistRepository = module.get(getRepositoryToken(Playlist));
        authService = module.get(AuthService);
        db = app.get(DataSource);
    });

    beforeEach(async () => {
        await clearDB(db);
    });

    afterAll(async () => {
        await app.close();
    });

    describe('createBundle', () => {
        it('should create a new bundle in the database', async () => {
            await movieRepository.save(testMovie);
            await movieRepository.save(testMovie2);
            const mutation = gql`
                mutation {
                    createBundle(
                        createBundleInput: {
                            id: 3
                            title: "Best movies"
                            description: "Best movies of all time"
                            rentablePeriod: { start: "2020-01-01 00:00:00", end: "2050-01-01 00:00:00" }
                            availability: { start: "2020-01-01 00:00:00", end: "2050-01-01 00:00:00" }
                            contents: [{ id: 1 }, { id: 2 }]
                        }
                    ) {
                        id
                        title
                        description
                        rentablePeriod {
                            start
                            end
                        }
                        type
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(mutation)
                });
            expect(res.body.data.createBundle).toEqual({
                id: testBundle.id,
                title: testBundle.title,
                rentablePeriod: { end: testBundle.rentablePeriod.end.toISOString(), start: testBundle.rentablePeriod.start.toISOString() },
                description: testBundle.description,
                type: ContentType.bundle
            });
            const dbBundle = await bundleRepository.findOne({ where: { id: testBundle.id }, relations: ['contents'] });
            expect(dbBundle).toEqual(testBundle);
        });

        it('should update a bundle when already in the database', async () => {
            await movieRepository.save(testMovie);
            await movieRepository.save(testMovie2);
            await bundleRepository.save(testBundle);

            const mutation = gql`
                mutation {
                    createBundle(
                        createBundleInput: {
                            id: 3
                            title: "Best movies 2"
                            description: "Best movies of all time"
                            rentablePeriod: { start: "2020-01-01 00:00:00", end: "2050-01-01 00:00:00" }
                            availability: { start: "2020-01-01 00:00:00", end: "2050-01-01 00:00:00" }
                            contents: [{ id: 1 }, { id: 2 }]
                        }
                    ) {
                        id
                        title
                        description
                        type
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(mutation)
                });

            expect(res.body.data.createBundle).toEqual({
                id: 3,
                type: ContentType.bundle,
                title: 'Best movies 2',
                description: 'Best movies of all time'
            });

            const dbBundle = await bundleRepository.findOne({ where: { id: testBundle.id } });
            expect(dbBundle).toEqual({
                id: 3,
                type: ContentType.bundle,
                title: 'Best movies 2',
                rentablePeriod: bundleFixture.rentablePeriod,
                availability: bundleFixture.availability,
                description: 'Best movies of all time'
            });
        });
    });

    describe('bundles', () => {
        it('should return all bundles', async () => {
            await movieRepository.save(testMovie);
            await movieRepository.save(testMovie2);
            await bundleRepository.save(testBundle);
            await bundleRepository.save(testBundle2);

            const query = gql`
                query {
                    bundles {
                        id
                        title
                        description
                        type
                        availability {
                            start
                            end
                        }
                        rentablePeriod {
                            start
                            end
                        }
                        contents {
                            ... on Movie {
                                id
                                title
                                type
                                rentablePeriod {
                                    start
                                    end
                                }
                                availability {
                                    start
                                    end
                                }
                                duration
                                description
                            }
                        }
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.bundles).toEqual([apiTestBundle, apiTestBundle2]);
        });

        it('should return an empty array when no bundles in the database', async () => {
            const query = gql`
                query {
                    bundles {
                        id
                        title
                        description
                        type
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.bundles).toEqual([]);
        });
    });

    describe('bundle', () => {
        it('should return a specific bundle', async () => {
            await movieRepository.save(testMovie);
            await movieRepository.save(testMovie2);
            await bundleRepository.save(testBundle);

            const query = gql`
                query {
                    bundle(id: 3) {
                        id
                        title
                        description
                        type
                        rentablePeriod {
                            start
                            end
                        }
                        availability {
                            start
                            end
                        }
                        contents {
                            ... on Movie {
                                id
                                title
                                type
                                rentablePeriod {
                                    start
                                    end
                                }
                                availability {
                                    start
                                    end
                                }
                                description
                                duration
                            }
                        }
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.bundle).toEqual(apiTestBundle);
        });

        it('should return a specific bundle with a playlist in it', async () => {
            await movieRepository.save(testMovie);
            await movieRepository.save(testMovie2);
            await playlistRepository.save(testPlaylist);
            const bundleWithPlaylist = { ...testBundle, contents: [testPlaylist] };
            await bundleRepository.save(bundleWithPlaylist);

            const query = gql`
                query {
                    bundle(id: 3) {
                        id
                        contents {
                            ... on Playlist {
                                id
                                type
                                contents {
                                    ... on Movie {
                                        id
                                    }
                                }
                            }
                        }
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.bundle).toMatchObject({
                id: bundleWithPlaylist.id,
                contents: [
                    {
                        id: testPlaylist.id,
                        type: testPlaylist.type,
                        contents: [
                            {
                                id: testMovie.id
                            }
                        ]
                    }
                ]
            });
        });

        it('should return a not found error', async () => {
            const query = gql`
                query {
                    bundle(id: 1) {
                        id
                        title
                        description
                        type
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
    });
});
