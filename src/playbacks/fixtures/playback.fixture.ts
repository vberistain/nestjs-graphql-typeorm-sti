import movieFixture from '../../contents/movies/fixtures/movie.fixture';
import { IPlayback } from '../playback.interface';

const playbackFixture: IPlayback = {
    id: 1,
    createdAt: new Date(21, 3, 2),
    updatedAt: new Date(21, 3, 3),
    started: true,
    finished: false,
    duration: 1222,
    position: 12,
    userId: 12,
    content: movieFixture
};

export default playbackFixture;
