import { CreateMovieInput } from '../dto/create-movie.input';

const createMovieInputFixture: CreateMovieInput = {
    duration: 123,
    id: 1,
    title: 'Title',
    rentablePeriod: {
        start: new Date(2020, 0, 1),
        end: new Date(2050, 0, 1)
    },
    availability: {
        start: new Date(2020, 0, 1),
        end: new Date(2050, 0, 1)
    },
    description: 'Description'
};

export default createMovieInputFixture;
