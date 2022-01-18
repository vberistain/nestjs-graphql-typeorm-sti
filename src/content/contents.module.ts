import { Module } from '@nestjs/common';
import { Content } from './content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
    imports: [TypeOrmModule.forFeature([Content]), MoviesModule, PlaylistsModule],
    providers: []
})
export class ContentsModule { }
