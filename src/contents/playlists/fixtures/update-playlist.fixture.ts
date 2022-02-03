import { ContentType } from '../../content.entity';
import { UpdatePlaylistInput } from '../dto/update-playlist.input';

const updatePlaylistInputFixture: UpdatePlaylistInput = {
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.playlist,
    contents: [{ id: 1 }, { id: 2 }]
};

export default updatePlaylistInputFixture;
