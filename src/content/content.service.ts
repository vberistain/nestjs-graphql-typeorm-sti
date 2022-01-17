import { Injectable } from '@nestjs/common';
import { UpdateContentInput } from './dto/update-content.input';
import { Content } from './content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
    constructor(
        @InjectRepository(Content)
        private readonly contentRepository: Repository<Content>
    ) {}

    findAll() {
        return this.contentRepository.find({});
    }

    findOne(id: number) {
        return this.contentRepository.findOne(id);
    }

    update(id: number, updateContentInput: UpdateContentInput) {
        return this.contentRepository.update(id, updateContentInput);
    }

    remove(id: number) {
        return this.contentRepository.delete(id);
    }
}
