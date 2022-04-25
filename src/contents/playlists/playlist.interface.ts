import { License } from '../../licenses/license.entity';
import { IContent } from '../content.interface';

export interface IPlaylist extends IContent {
    license?: License;
    contents: IContent[];
}
