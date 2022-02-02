import { ContentType } from '../../content.entity';
import { UpdateLivestreamInput } from '../dto/update-livestream.input';

const updateLivestreamInputFixture: UpdateLivestreamInput = {
    duration: 123,
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.movie
};

export default updateLivestreamInputFixture;
