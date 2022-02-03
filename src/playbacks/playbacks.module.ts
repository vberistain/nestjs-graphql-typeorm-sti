import { Module } from '@nestjs/common';
import { PlaybacksService } from './playbacks.service';
import { PlaybacksResolver } from './playbacks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../contents/content.entity';
import { Playback } from './playback.entity';
import { Livestream } from '../contents/livestreams/livestream.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Playback, Livestream])],
    providers: [PlaybacksResolver, PlaybacksService]
})
export class PlaybacksModule {}
