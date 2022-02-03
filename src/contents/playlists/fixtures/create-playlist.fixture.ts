import { ContentType } from '../../content.entity';
import { CreatePlaylistInput } from '../dto/create-playlist.input';

const createPlaylistInputFixture: CreatePlaylistInput = {
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.movie,
    contents: [{ id: 1 }, { id: 2 }],
    license: { id: 2 }
};

export default createPlaylistInputFixture;
