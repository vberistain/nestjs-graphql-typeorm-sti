import { ContentType } from '../content/content.entity';
import { Playback } from './playback.entity';

const playbackFixture: Playback = {
    id: 1,
    createdAt: new Date(21, 3, 2),
    updatedAt: new Date(21, 3, 3),
    started: true,
    finished: false,
    duration: 1222,
    position: 12,
    userId: 12,
    content: {
        id: 1,
        title: 'Title',
        description: 'Description',
        type: ContentType.movie
    }
};

export default playbackFixture;
