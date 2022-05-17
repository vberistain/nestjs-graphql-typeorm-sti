import { CreatePlaylistInput } from '../dto/create-playlist.input';

const createPlaylistInputFixture: CreatePlaylistInput = {
    id: 1,
    title: 'Title',
    description: 'Description',
    rentablePeriod: {
        start: new Date(2020, 0, 1),
        end: new Date(2050, 0, 1)
    },
    availability: {
        start: new Date(2020, 0, 1),
        end: new Date(2050, 0, 1)
    },
    contents: [{ id: 1 }, { id: 2 }]
};

export default createPlaylistInputFixture;
