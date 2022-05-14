import { ILicense } from '../licenses/license.interface';
import { Content } from './content.entity';

export enum ContentType {
    movie = 'movie',
    playlist = 'playlist',
    bundle = 'bundle'
}
export interface IContent {
    id: number;
    title: string;
    type: ContentType;
    description?: string;
    contents?: Content[];
    license?: ILicense;
    inContents?: Content[];
}
