import { ContentType } from './content.entity';

export interface IContent {
    id: number;
    title: string;
    type: ContentType;
    description?: string;
}
