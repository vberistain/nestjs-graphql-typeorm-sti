import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content, ContentType } from '../content.entity';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistsService {
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>;

    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>;

    create(createPlaylistInput: CreatePlaylistInput) {
        return this.playlistRepository.save({ ...createPlaylistInput, type: ContentType.playlist });
    }

    findAll() {
        return this.playlistRepository.find({ relations: ['contents'] });
    }

    findOne(id: number) {
        return this.playlistRepository.findOne(id, { relations: ['contents'] });
    }

    update(id: number, updateContentInput: UpdatePlaylistInput) {
        return this.playlistRepository.update(id, updateContentInput);
    }

    remove(id: number) {
        return this.playlistRepository.delete(id);
    }
}
