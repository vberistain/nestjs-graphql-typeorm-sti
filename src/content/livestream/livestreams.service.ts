import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { EntityNotFoundError } from '@customErrors';
import { CreateLivestreamInput } from './dto/create-livestream.input';
import { UpdateLivestreamInput } from './dto/update-livestream.input';
import { Livestream } from './livestream.entity';
import { BaseService } from '@common/base/base.service';

@Injectable()
export class LivestreamsService extends BaseService<Livestream, CreateLivestreamInput, UpdateLivestreamInput> {
    constructor(
        @InjectRepository(Livestream)
        private readonly livestreamsRepository: Repository<Livestream>
    ) {
        super(livestreamsRepository);
    }
}
