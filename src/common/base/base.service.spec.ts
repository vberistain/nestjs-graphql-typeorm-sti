import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { repositoryMockFactory } from '../../../test/utils';
import createMovieInputFixture from '../../content/movies/fixtures/create-movie.fixture';
import updateMovieInputFixture from '../../content/movies/fixtures/update-movie.fixture';
import { Movie } from '../../content/movies/movie.entity';
import movieFixture from '../../content/movies/fixtures/movie.fixture';
import { MoviesService } from '../../content/movies/movies.service';

describe('MoviesService', () => {
    let service: MoviesService;
    let repository: Repository<Movie>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MoviesService,
                {
                    provide: getRepositoryToken(Movie),
                    useFactory: repositoryMockFactory(movieFixture)
                }
            ]
        }).compile();

        service = module.get<MoviesService>(MoviesService);
        repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    });

    describe('create', () => {
        it('should call repository.save with the right parameters and return the result', async () => {
            const res = await service.create(createMovieInputFixture);
            expect(repository.save).toHaveBeenCalledWith({ ...createMovieInputFixture, type: 'movie' });
            expect(res).toEqual(movieFixture);
        });
    });

    describe('findAll', () => {
        it('should call repository.find with the right parameters and return the result', async () => {
            const res = await service.findAll();
            expect(repository.find).toHaveBeenCalledWith();
            expect(res).toEqual([movieFixture]);
        });
    });

    describe('findOne', () => {
        it('should call repository.findOne with the right parameters and return the result', async () => {
            const res = await service.findOne(1);
            expect(repository.findOne).toHaveBeenCalledWith(1);
            expect(res).toEqual(movieFixture);
        });
    });

    describe('update', () => {
        it('should call repository.update with the right parameters and return the result', async () => {
            const res = await service.update(1, updateMovieInputFixture);
            expect(repository.update).toHaveBeenCalledWith(1, updateMovieInputFixture);
            expect(res).toEqual(movieFixture);
        });
    });

    describe('delete', () => {
        it('should call repository.delete with the right parameters', async () => {
            await service.remove(1);
            expect(repository.delete).toHaveBeenCalledWith(1);
        });
    });
});
