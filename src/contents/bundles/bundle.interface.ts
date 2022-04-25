import { IContent } from '../content.interface';
import { License } from '../../licenses/license.entity';

export interface IBundle extends IContent {
    license?: License;
    contents: IContent[];
}
