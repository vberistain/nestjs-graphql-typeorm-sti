import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/base/base.service';
import { DuplicatedEntityError, RelatedEntityNotFoundError } from '../common/errors/custom-errors';
import { CreatePlaybackInput } from './dto/create-playback.input';
import { UpdatePlaybackInput } from './dto/update-playback.input';
import { Playback } from './playback.entity';

@Injectable()
export class PlaybacksService extends BaseService<Playback, CreatePlaybackInput, UpdatePlaybackInput> {
    constructor(
        @InjectRepository(Playback)
        private readonly playbacksRepository: Repository<Playback>
    ) {
        super(playbacksRepository);
    }

    async create(createPlaybackInput: CreatePlaybackInput) {
        try {
            return await this.playbacksRepository.save(createPlaybackInput);
        } catch (e: any) {
            if (e.code === 'ER_DUP_ENTRY') {
                throw new DuplicatedEntityError();
            }
            if (e.code.includes('ER_NO_REFERENCED')) {
                throw new RelatedEntityNotFoundError();
            }
        }
    }
}
