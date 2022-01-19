import { CreateLicenseInput } from './create-license.input';

const createLicenseInputFixture: CreateLicenseInput = {
    id: 1,
    userId: 12,
    expireDate: new Date(21, 3, 3),
    startDate: new Date(21, 3, 3),
    content: {
        id: 1
    }
};

export default createLicenseInputFixture;
