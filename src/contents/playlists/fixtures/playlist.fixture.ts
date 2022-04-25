import { ContentType } from '../../content.entity';
import { IPlaylist } from '../playlist.interface';

const playlistFixture: IPlaylist = {
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.playlist,
    contents: []
};

export default playlistFixture;
