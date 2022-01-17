import { Module } from '@nestjs/common';
import { LivestreamService } from './livestream.service';
import { Livestream } from './livestream.entity';
import { LivestreamResolver } from './livestream.resolver';
import { Content } from '../content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Livestream])],
    providers: [LivestreamResolver, LivestreamService]
})
export class LivestreamModule { }
