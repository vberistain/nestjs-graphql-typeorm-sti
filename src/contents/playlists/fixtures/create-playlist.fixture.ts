import { CreatePlaylistInput } from '../dto/create-playlist.input';

const createPlaylistInputFixture: CreatePlaylistInput = {
    id: 1,
    title: 'Title',
    description: 'Description',
    contents: [{ id: 1 }, { id: 2 }]
};

export default createPlaylistInputFixture;
