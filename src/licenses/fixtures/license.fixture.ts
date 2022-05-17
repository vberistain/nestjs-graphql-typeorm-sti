import { ContentType } from '../../contents/content.interface';
import movieFixture from '../../contents/movies/fixtures/movie.fixture';
import { ILicense } from '../license.interface';

const licenseFixture: ILicense = {
    id: 1,
    userId: 12,
    expireDate: new Date(21, 3, 3),
    startDate: new Date(21, 3, 2),
    content: movieFixture
};

export default licenseFixture;
