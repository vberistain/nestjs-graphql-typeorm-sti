import { CreateLicenseInput } from './create-license.input';

const createLicenseInputFixture: CreateLicenseInput = {
    contentId: 1,
    id: 1,
    expireDate: new Date(21, 3, 3),
    startDate: new Date(21, 3, 3)
};

export default createLicenseInputFixture;
