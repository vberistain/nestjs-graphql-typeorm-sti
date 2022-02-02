import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from '../src/content/movies/movie.entity';
import { Connection, Repository } from 'typeorm';
import { ContentType } from '../src/content/content.entity';
import { createTestingAppModule } from './utils';

const testMovie: Movie = {
    id: 1,
    title: 'Interstellar',
    description: 'Interestellar description',
    duration: 223,
    type: ContentType.movie
};

const testMovie2: Movie = {
    id: 2,
    title: 'Matrix',
    description: 'Matrix description',
    duration: 243,
    type: ContentType.movie
};

describe('MovieResolver (e2e)', () => {
    let app: INestApplication;
    let module: TestingModule;
    let movieRepository: Repository<Movie>;
    let db: Connection;

    beforeAll(async () => {
        ({ app, module } = await createTestingAppModule());
        movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
        db = app.get(Connection);
    });

    beforeEach(async () => {
        await db.synchronize(true);
    });

    afterAll(async () => {
        await app.close();
    });

    describe('createMovie', () => {
        it('should create a new movie in the database', async () => {
            const mutation = gql`
                mutation {
                    createMovie(
                        createMovieInput: {
                            id: 1
                            title: "Interstellar"
                            description: "Interestellar description"
                            duration: 223
                            type: movie
                        }
                    ) {
                        id
                        title
                        description
                        duration
                        type
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(mutation)
                });
            expect(res.body.data.createMovie).toEqual(testMovie);

            const dbMovie = await movieRepository.findOne(testMovie.id);
            expect(dbMovie).toEqual(testMovie);
        });

        it('should update a movie when already in the database', async () => {
            await movieRepository.save(testMovie);
            const mutation = gql`
                mutation {
                    createMovie(
                        createMovieInput: {
                            id: 1
                            title: "Interstellar 2"
                            description: "Interestellar description 2"
                            duration: 224
                            type: movie
                        }
                    ) {
                        id
                        title
                        description
                        duration
                        type
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(mutation)
                });

            expect(res.body.data.createMovie).toEqual({
                id: 1,
                duration: 224,
                type: 'movie',
                title: 'Interstellar 2',
                description: 'Interestellar description 2'
            });

            const dbMovie = await movieRepository.findOne(testMovie.id);
            expect(dbMovie).toEqual({
                id: 1,
                duration: 224,
                type: 'movie',
                title: 'Interstellar 2',
                description: 'Interestellar description 2'
            });
        });
    });

    describe('findAllMovies', () => {
        it('should return all movies', async () => {
            await movieRepository.save(testMovie);
            await movieRepository.save(testMovie2);

            const query = gql`
                query {
                    movies {
                        id
                        title
                        description
                        duration
                        type
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.movies).toEqual([testMovie, testMovie2]);
        });

        it('should return an empty array when no movies in the database', async () => {
            const query = gql`
                query {
                    movies {
                        id
                        title
                        description
                        duration
                        type
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.movies).toEqual([]);
        });
    });

    describe('movie', () => {
        it('should return a specific movie', async () => {
            await movieRepository.save(testMovie);

            const query = gql`
                query {
                    movie(id: 1) {
                        id
                        title
                        description
                        duration
                        type
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.movie).toEqual(testMovie);
        });

        it('should return a not found error', async () => {
            const query = gql`
                query {
                    movie(id: 1) {
                        id
                        title
                        description
                        duration
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

    describe('updateMovie', () => {
        it('should update a specific movie', async () => {
            await movieRepository.save(testMovie);

            const query = gql`
                mutation {
                    updateMovie(id: 1, updateMovieInput: { id: 1, title: "Interstellar 2" }) {
                        id
                        title
                        description
                        duration
                        type
                    }
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.updateMovie).toEqual({
                ...testMovie,
                title: 'Interstellar 2'
            });
        });

        it('should return a not found error when updating a movie that doesnt exist', async () => {
            const query = gql`
                mutation {
                    updateMovie(id: 1, updateMovieInput: { title: "Interstellar 2" }) {
                        id
                        title
                        description
                        duration
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

    describe('removeMovie', () => {
        it('should remove a specific movie', async () => {
            await movieRepository.save(testMovie);

            const query = gql`
                mutation {
                    removeMovie(id: 1)
                }
            `;

            const res = await request(app.getHttpServer())
                .post('/graphql')
                .send({
                    query: print(query)
                });
            expect(res.body.data.removeMovie).toEqual(true);

            const movie = await movieRepository.findOne(1);
            expect(movie).toBeUndefined;
        });

        it('should return a not found error when removing a movie that doesnt exist', async () => {
            const query = gql`
                mutation {
                    removeMovie(id: 1)
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
