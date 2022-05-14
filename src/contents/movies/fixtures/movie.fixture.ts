import { ContentType } from '../../content.interface';
import { IMovie } from '../movie.interface';

const movieFixture: IMovie = {
    id: 1,
    title: 'Title',
    duration: 123,
    description: 'Description',
    type: ContentType.movie
};

export default movieFixture;
