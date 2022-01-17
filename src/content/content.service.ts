import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { Content } from './content.entity';

@Injectable()
export class ContentService {
    constructor(
        @InjectRepository(Content)
        private readonly contentRepository: EntityRepository<Content>
    ) {}
    async create(createContentInput: CreateContentInput) {
        const res = await this.contentRepository.create(createContentInput);
        return res;
    }

    findAll() {
        return this.contentRepository.find({});
    }

    findOne(id: number) {
        return this.contentRepository.findOne(id);
    }

    update(id: number, updateContentInput: UpdateContentInput) {
        return this.contentRepository.nativeUpdate(id, updateContentInput);
    }

    remove(id: number) {
        return this.contentRepository.nativeDelete(id);
    }
}
