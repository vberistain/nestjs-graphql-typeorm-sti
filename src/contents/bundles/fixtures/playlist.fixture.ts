import { ContentType } from '../../content.interface';
import { IBundle } from '../bundle.interface';

const bundleFixture: IBundle = {
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.bundle,
    rentablePeriod: {
        start: new Date(2020, 0, 1),
        end: new Date(2050, 0, 1)
    },
    availability: {
        start: new Date(2020, 0, 1),
        end: new Date(2050, 0, 1)
    },
    contents: []
};

export default bundleFixture;
