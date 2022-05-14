import { ContentType } from '../../contents/content.interface';
import { ILicense } from '../license.interface';

const licenseFixture: ILicense = {
    id: 1,
    userId: 12,
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
