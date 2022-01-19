import { Module } from '@nestjs/common';
import { PlaybacksService } from './playbacks.service';
import { PlaybacksResolver } from './playbacks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../content/content.entity';
import { Playback } from './playback.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Playback])],
    providers: [PlaybacksResolver, PlaybacksService]
})
export class PlaybacksModule {}
