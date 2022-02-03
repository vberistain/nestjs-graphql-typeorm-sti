import { Module } from '@nestjs/common';
import { LivestreamsService } from './livestreams.service';
import { Livestream } from './livestream.entity';
import { LivestreamsResolver } from './livestream.resolver';
import { Content } from '../content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Livestream])],
    providers: [LivestreamsResolver, LivestreamsService]
})
export class LivestreamsModule {}
