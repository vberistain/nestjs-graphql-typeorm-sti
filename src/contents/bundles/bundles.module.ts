import { Module } from '@nestjs/common';
import { BundlesService } from './bundles.service';
import { BundlesResolver } from './bundles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bundle } from './bundle.entity';
import { Content } from '../content.entity';
import { Playlist } from '../playlists/playlist.entity';
import { Movie } from '../movies/movie.entity';
import { License } from '../../licenses/license.entity';
import { Playback } from '../../playbacks/playback.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Bundle, Content, Playlist, Movie, Playback, License])],
    providers: [BundlesResolver, BundlesService]
})
export class BundlesModule {}
