import { Module } from '@nestjs/common';
import { PlaybacksService } from './playbacks.service';
import { PlaybacksResolver } from './playbacks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../content/content.entity';
import { Playback } from './playback.entity';
import { Livestream } from '../content/livestream/livestream.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Playback, Livestream])],
    providers: [PlaybacksResolver, PlaybacksService]
})
export class PlaybacksModule {}
