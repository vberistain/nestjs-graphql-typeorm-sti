import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content, ContentType } from '../content.entity';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistsService {
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>
    async create(createPlaylistInput: CreatePlaylistInput) {
        console.log(createPlaylistInput);
        const res = await this.playlistRepository.save({ ...createPlaylistInput, type: ContentType.playlist });
        return res;
    }

    findAll() {
        return this.playlistRepository.find({ relations: ["contents"] });
    }

    findOne(id: number) {
        return this.playlistRepository.findOne(id, { relations: ["contents"] });
    }

    // update(id: number, updateContentInput: UpdatePlayInput) {
    //     return this.playlistRepository.update(id, updateContentInput);
    // }

    remove(id: number) {
        return this.playlistRepository.delete(id);
    }

    async addContent(playlistId: number, contentId: number) {
        const playlist = await this.playlistRepository.findOneOrFail(playlistId, { relations: ["contents"] });
        const content = await this.contentRepository.findOneOrFail(contentId);
        console.log(playlist.contents)
        playlist.contents.push(content);
        return await playlist.save();
    }
}
