import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaybackInput } from './dto/create-playback.input';
import { UpdatePlaybackInput } from './dto/update-playback.input';
import { Playback } from './playback.entity';

@Injectable()
export class PlaybacksService {
    @InjectRepository(Playback)
    private readonly playbacksRepository: Repository<Playback>;

    create(createPlaybackInput: CreatePlaybackInput) {
        return this.playbacksRepository.save(createPlaybackInput);
    }

    findAll() {
        return this.playbacksRepository.find();
    }

    findOne(id: number) {
        return this.playbacksRepository.findOne(id);
    }

    update(id: number, updatePlaybackInput: UpdatePlaybackInput) {
        return this.playbacksRepository.update(id, updatePlaybackInput);
    }

    remove(id: number) {
        return this.playbacksRepository.delete(id);
    }
}
