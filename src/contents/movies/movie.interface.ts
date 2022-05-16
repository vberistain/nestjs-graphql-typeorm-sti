import { Playback } from '../../playbacks/playback.entity';
import { IContent } from '../content.interface';

export interface IMovie extends IContent {
    duration: number;
    playback?: Playback;
}
