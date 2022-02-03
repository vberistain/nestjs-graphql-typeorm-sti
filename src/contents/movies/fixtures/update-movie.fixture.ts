import { ContentType } from '../../content.entity';
import { UpdateMovieInput } from '../dto/update-movie.input';

const updateMovieInputFixture: UpdateMovieInput = {
    duration: 123,
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.movie
};

export default updateMovieInputFixture;
