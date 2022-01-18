import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content, ContentType } from '../content.entity';
import { CreatePlaylistInput } from './dto/create-playlist.input';
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

    // update(id: number, updateContentInput: UpdatePlayInput) {
    //     return this.playlistRepository.update(id, updateContentInput);
    // }

    remove(id: number) {
        return this.playlistRepository.delete(id);
    }

    async addContent(playlistId: number, contentId: number): Promise<Playlist> {
        const playlist = await this.playlistRepository.findOneOrFail(playlistId, { relations: ['contents'] });
        if (playlist.contents.find((content) => content.id === contentId)) {
            return playlist;
        }
        const content = await this.contentRepository.findOneOrFail(contentId);
        playlist.contents.push(content);
        return this.playlistRepository.save(playlist);
    }

    async removeContent(playlistId: number, contentId: number): Promise<Playlist> {
        const playlist = await this.playlistRepository.findOneOrFail(playlistId, { relations: ['contents'] });
        if (!playlist.contents.find((content) => content.id == contentId)) {
            return playlist;
        }
        playlist.contents = playlist.contents.filter((content) => content.id !== contentId);
        return this.playlistRepository.save(playlist);
    }
}
