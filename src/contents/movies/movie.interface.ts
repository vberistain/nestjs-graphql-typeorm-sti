import { License } from '../../licenses/license.entity';
import { Playback } from '../../playbacks/playback.entity';
import { IContent } from '../content.interface';
// import { IPlaylist } from '../playlists/playlist.interface';

export interface IMovie extends IContent {
    duration: number;
    playback?: Playback;
}
