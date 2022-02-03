import { ContentType } from '../../content.entity';
import { CreateLivestreamInput } from '../dto/create-livestream.input';

const createLivestreamInputFixture: CreateLivestreamInput = {
    duration: 123,
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.movie
};

export default createLivestreamInputFixture;
