import { Module } from '@nestjs/common';
import { Content } from './content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { LivestreamsModule } from './livestream/livestream.module';

@Module({
    imports: [TypeOrmModule.forFeature([Content]), MoviesModule, PlaylistsModule, LivestreamsModule],
    providers: []
})
export class ContentsModule {}
