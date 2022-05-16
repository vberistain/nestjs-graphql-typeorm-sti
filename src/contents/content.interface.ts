import { ILicense } from '../licenses/license.interface';

export interface IContent {
    id: number;
    title: string;
    type: ContentType;
    description?: string;
    contents?: IContent[];
    license?: ILicense;
    inContents?: IContent[];
}

export enum ContentType {
    movie = 'movie',
    playlist = 'playlist',
    bundle = 'bundle'
}
