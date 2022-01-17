import { Module } from '@nestjs/common';
import { Content } from '../content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Playlist])],
    providers: [PlaylistResolver, PlaylistService]
})
export class PlaylistModule { }
