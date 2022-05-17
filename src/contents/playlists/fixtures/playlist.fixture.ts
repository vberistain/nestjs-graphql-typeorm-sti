import { ContentType } from '../../content.interface';
import { IPlaylist } from '../playlist.interface';

const playlistFixture: IPlaylist = {
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.playlist,
    rentablePeriod: {
        start: new Date(2020, 1, 1),
        end: new Date(2050, 1, 1)
    },
    availability: {
        start: new Date(2020, 1, 1),
        end: new Date(2050, 1, 1)
    },
    contents: []
};

export default playlistFixture;
