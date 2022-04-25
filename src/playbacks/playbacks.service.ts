import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/base/base.service';
import { DuplicatedEntityError, RelatedEntityNotFoundError } from '@customErrors';
import { CreatePlaybackInput } from './dto/create-playback.input';
import { UpdatePlaybackInput } from './dto/update-playback.input';
import { Playback } from './playback.entity';
import MySQLErrors from '@common/errors/mysql-errors';

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
            //@TODO: extract to a Mysql error mapper common method
            if (e.code === MySQLErrors.DuplicatedEntryError) {
                throw new DuplicatedEntityError();
            }
            if (e.code === MySQLErrors.ForeignKeyConstrainError || e.code === MySQLErrors.ForeignKeyConstrain2Error) {
                throw new RelatedEntityNotFoundError();
            }
        }
    }
}
