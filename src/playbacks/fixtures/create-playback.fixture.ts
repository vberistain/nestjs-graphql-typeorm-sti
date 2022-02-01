import { CreatePlaybackInput } from '../dto/create-playback.input';

const createPlaybackFixture: CreatePlaybackInput = {
    duration: 123,
    finished: false,
    started: true,
    position: 122,
    userId: 12,
    content: { id: 1 }
};

export default createPlaybackFixture;
