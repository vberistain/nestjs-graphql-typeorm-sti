import { ContentType } from '../../content.entity';
import { Livestream } from '../livestream.entity';

const movieFixture: Livestream = {
    duration: 123,
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.movie
};

export default movieFixture;
