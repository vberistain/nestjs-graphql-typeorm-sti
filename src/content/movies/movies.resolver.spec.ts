import { Test, TestingModule } from '@nestjs/testing';
import { serviceMockFactory } from '../../../test/utils';
import { UpdateMovieInput } from './dto/update-movie.input';
import movieFixture from './fixtures/movie.fixture';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';

describe('MoviesResolver', () => {
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
            await resolver.createMovie(movieFixture);
            expect(service.create).toHaveBeenCalledWith(movieFixture);
        });
    });

    describe('findMovies', () => {
        it('should call MoviesService.findAll', async () => {
            await resolver.findMovies();
            expect(service.findAll).toHaveBeenCalledWith();
        });
    });

    describe('findMovie', () => {
        it('should call MoviesService.findOne', async () => {
            await resolver.findMovie(1);
            expect(service.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should call MoviesService.update', async () => {
            const input: UpdateMovieInput = { id: movieFixture.id, title: 'Another title' };
            const res = await resolver.updateMovie(input);
            expect(service.update).toHaveBeenCalledWith(movieFixture.id, input);
        });
    });

    describe('delete', () => {
        it('should call MoviesService.delete', async () => {
            await resolver.removeMovie(1);
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
