import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentType } from '../content.entity';
import { UpdateContentInput } from '../dto/update-content.input';
import { CreateLivestreamInput } from './dto/create-livestream.input';
import { Livestream } from './livestream.entity';

@Injectable()
export class LivestreamService {
    @InjectRepository(Livestream)
    private readonly livestreamRepository: Repository<Livestream>
    async create(createLivestreamInput: CreateLivestreamInput) {
        return await this.livestreamRepository.save({ ...createLivestreamInput, type: ContentType.livestream });
    }

    findAll() {
        return this.livestreamRepository.find({});
    }

    findOne(id: number) {
        return this.livestreamRepository.findOne(id);
    }

    update(id: number, updateContentInput: UpdateContentInput) {
        return this.livestreamRepository.update(id, updateContentInput);
    }

    remove(id: number) {
        return this.livestreamRepository.delete(id);
    }
}
