import { ILicense } from '../licenses/license.interface';

export interface IContent {
    id: number;
    title: string;
    type: ContentType;
    rentablePeriod: DateRange;
    availability: DateRange;
    description?: string;
    contents?: IContent[];
    license?: ILicense;
    inContents?: IContent[];
}

export interface DateRange {
    start: Date;
    end: Date;
}

export enum ContentType {
    movie = 'movie',
    playlist = 'playlist',
    bundle = 'bundle'
}
