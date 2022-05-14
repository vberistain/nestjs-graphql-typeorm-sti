import { ContentType } from '../../content.interface';
import { IBundle } from '../bundle.interface';

const bundleFixture: IBundle = {
    id: 1,
    title: 'Title',
    description: 'Description',
    type: ContentType.playlist,
    contents: []
};

export default bundleFixture;
