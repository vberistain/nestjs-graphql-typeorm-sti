import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentType } from '../content.entity';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistService {
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>
    async create(createPlaylistInput: CreatePlaylistInput) {
        console.log(createPlaylistInput);
        const res = await this.playlistRepository.save({ ...createPlaylistInput, type: ContentType.playlist });
        return res;
    }

    findAll() {
        return this.playlistRepository.find({});
    }

    findOne(id: number) {
        return this.playlistRepository.findOne(id);
    }

    // update(id: number, updateContentInput: UpdatePlayInput) {
    //     return this.playlistRepository.update(id, updateContentInput);
    // }

    remove(id: number) {
        return this.playlistRepository.delete(id);
    }
}
