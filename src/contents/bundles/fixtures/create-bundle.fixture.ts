import { CreateBundleInput } from '../dto/create-bundle.input';

const createBundleInputFixture: CreateBundleInput = {
    id: 1,
    title: 'Title',
    description: 'Description',
    contents: [{ id: 1 }, { id: 2 }]
};

export default createBundleInputFixture;
