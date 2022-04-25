import { IContent } from '../contents/content.interface';

export class ILicense {
    id: number;
    userId: number;
    expireDate?: Date;
    startDate?: Date;
    content: IContent;
}
