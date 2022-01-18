import { ContentType } from '../content/content.entity';
import { License } from './license.entity';

const licenseFixture: License = {
    id: 1,
    expireDate: new Date(21, 3, 3),
    startDate: new Date(21, 3, 2),
    content: {
        id: 1,
        title: 'Title',
        description: 'Description',
        type: ContentType.movie
    }
};

export default licenseFixture;
