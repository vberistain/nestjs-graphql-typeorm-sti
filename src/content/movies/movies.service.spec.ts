import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { repositoryMockFactory } from '../../../test/utils';
import createMovieInputFixture from './dto/create-movie.fixture';
import { Movie } from './movie.entity';
import movieFixture from './movie.fixture';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
    let service: MoviesService;
    let repository: Repository<Movie>;

    const mockRepo: Partial<Repository<Movie>> = {
        find: jest.fn(async () => [movieFixture]),
        save: jest.fn(async (movieFixture: any) => movieFixture),
        findOne: jest.fn(async () => movieFixture),
        delete: jest.fn(async () => ({ raw: {} }))
    };

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
            expect(repository.find).toHaveBeenCalledWith({});
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

    describe('delete', () => {
        it('should call repository.delete with the right parameters', async () => {
            await service.remove(1);
            expect(repository.delete).toHaveBeenCalledWith(1);
        });
    });
});
