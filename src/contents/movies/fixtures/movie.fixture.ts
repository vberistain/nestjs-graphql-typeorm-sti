import { ContentType } from '../../content.interface';
import { IMovie } from '../movie.interface';

const movieFixture: IMovie = {
    id: 1,
    title: 'Title',
    duration: 123,
    rentablePeriod: {
        start: new Date(2020, 0, 1),
        end: new Date(2050, 0, 1)
    },
    availability: {
        start: new Date(2020, 0, 1),
        end: new Date(2050, 0, 1)
    },
    description: 'Description',
    type: ContentType.movie
};

export default movieFixture;
