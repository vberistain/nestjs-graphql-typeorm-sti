import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlaybacksService } from './playbacks.service';
import { Playback } from './playback.entity';
import { CreatePlaybackInput } from './dto/create-playback.input';
import { UpdatePlaybackInput } from './dto/update-playback.input';
import { BaseResolver } from '../common/base/base.resolver';

@Resolver(() => Playback)
export class PlaybacksResolver extends BaseResolver(Playback, CreatePlaybackInput, UpdatePlaybackInput) {
    constructor(private readonly playbacksService: PlaybacksService) {
        super(playbacksService);
    }
}
