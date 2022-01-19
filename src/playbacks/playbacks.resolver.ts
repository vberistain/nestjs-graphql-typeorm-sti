import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlaybacksService } from './playbacks.service';
import { Playback } from './playback.entity';
import { CreatePlaybackInput } from './dto/create-playback.input';
import { UpdatePlaybackInput } from './dto/update-playback.input';
import { Inject } from '@nestjs/common';

@Resolver(() => Playback)
export class PlaybacksResolver {
    @Inject()
    private readonly playbacksService: PlaybacksService;

    @Mutation(() => Playback)
    createPlayback(@Args('createPlaybackInput') createPlaybackInput: CreatePlaybackInput) {
        return this.playbacksService.create(createPlaybackInput);
    }

    @Query(() => [Playback], { name: 'playbacks' })
    findPlaybacks() {
        return this.playbacksService.findAll();
    }

    @Query(() => Playback, { name: 'playback' })
    findPlayback(@Args('id', { type: () => Int }) id: number) {
        return this.playbacksService.findOne(id);
    }

    @Mutation(() => Playback)
    updatePlayback(@Args('updatePlaybackInput') updatePlaybackInput: UpdatePlaybackInput) {
        return this.playbacksService.update(updatePlaybackInput.id, updatePlaybackInput);
    }

    @Mutation(() => Playback)
    removePlayback(@Args('id', { type: () => Int }) id: number) {
        return this.playbacksService.remove(id);
    }
}
