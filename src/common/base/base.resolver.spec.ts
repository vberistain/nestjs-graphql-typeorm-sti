import { Test, TestingModule } from '@nestjs/testing';
import { serviceMockFactory } from '../../../test/utils';
import { UpdateMovieInput } from '../../contents/movies/dto/update-movie.input';
import movieFixture from '../../contents/movies/fixtures/movie.fixture';
import { MoviesResolver } from '../../contents/movies/movies.resolver';
import { MoviesService } from '../../contents/movies/movies.service';

describe('BaseResolver', () => {
    let resolver: MoviesResolver;
    let service: MoviesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesResolver, { provide: MoviesService, useFactory: serviceMockFactory(movieFixture) }]
        }).compile();

        resolver = module.get<MoviesResolver>(MoviesResolver);
        service = module.get<MoviesService>(MoviesService);
    });

    describe('createMovie', () => {
        it('should call MoviesService.create', async () => {
            await resolver.create(movieFixture);
            expect(service.create).toHaveBeenCalledWith(movieFixture);
        });
    });

    describe('movies', () => {
        it('should call MoviesService.findAll', async () => {
            await resolver.findAll();
            expect(service.findAll).toHaveBeenCalledWith();
        });
    });

    describe('movie', () => {
        it('should call MoviesService.findOne', async () => {
            await resolver.findOne(1);
            expect(service.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('updateMovie', () => {
        it('should call MoviesService.update', async () => {
            const input: UpdateMovieInput = { title: 'Another title' };
            const res = await resolver.update(movieFixture.id, input);
            expect(service.update).toHaveBeenCalledWith(movieFixture.id, input);
        });
    });

    describe('deleteMovie', () => {
        it('should call MoviesService.delete', async () => {
            await resolver.remove(1);
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
