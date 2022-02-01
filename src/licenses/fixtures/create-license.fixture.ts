import { CreateLicenseInput } from '../dto/create-license.input';

const createLicenseInputFixture: CreateLicenseInput = {
    userId: 12,
    expireDate: new Date(21, 3, 3),
    startDate: new Date(21, 3, 3),
    content: {
        id: 1
    }
};

export default createLicenseInputFixture;
