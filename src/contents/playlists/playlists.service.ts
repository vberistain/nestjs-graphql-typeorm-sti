import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistsService {
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>;

    async create(createPlaylistInput: CreatePlaylistInput) {
        await this.playlistRepository.save(createPlaylistInput);
        return this.playlistRepository.findOne({ where: { id: createPlaylistInput.id }, relations: ['contents'] });
    }

    findAll() {
        return this.playlistRepository.find({ relations: ['contents'] });
    }

    findOne(id: number) {
        return this.playlistRepository.findOne({ where: { id }, relations: ['contents'] });
    }

    update(id: number, updateContentInput: UpdatePlaylistInput) {
        return this.playlistRepository.update(id, updateContentInput);
    }

    remove(id: number) {
        return this.playlistRepository.delete(id);
    }
}
