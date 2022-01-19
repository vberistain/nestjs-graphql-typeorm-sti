import { ContentType } from '../../content.entity';
import { Movie } from '../movie.entity';

const movieFixture: Movie = {
    duration: 123,
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.movie
};

export default movieFixture;
