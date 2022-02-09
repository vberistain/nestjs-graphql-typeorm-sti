import * as DataLoader from 'dataloader';
import { mapFromArray } from '../common/utils';
import { Playback } from './playback.entity';
import { PlaybacksService } from './playbacks.service';

export function createPlaybackLoader(playbackService: PlaybacksService) {
    return new DataLoader<{ id: number; userId: number }, Playback>(
        async (items: { id: number; userId: number }[]): Promise<Playback[]> => {
            const playbacks = await playbackService.findByIds(
                items.map((item) => item.id),
                { userId: items[0].userId }
            );
            console.log(playbacks);
            const playbacksMap = mapFromArray(playbacks, (playback) => playback.id);
            return items.map((item) => playbacksMap[item.id]);
        }
    );
}
