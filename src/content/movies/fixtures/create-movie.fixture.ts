import { ContentType } from '../../content.entity';
import { CreateMovieInput } from '../dto/create-movie.input';

const createMovieInputFixture: CreateMovieInput = {
    duration: 123,
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.movie
};

export default createMovieInputFixture;
