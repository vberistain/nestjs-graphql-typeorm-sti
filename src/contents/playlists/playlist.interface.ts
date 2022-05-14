import { IContent } from '../content.interface';

export interface IPlaylist extends IContent {
    contents: IContent[];
}
