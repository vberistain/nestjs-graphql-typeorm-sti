import { ContentType } from '../../content.entity';
import { Playlist } from '../playlist.entity';

const playlistFixture: Playlist = {
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.playlist,
    contents: []
};

export default playlistFixture;
