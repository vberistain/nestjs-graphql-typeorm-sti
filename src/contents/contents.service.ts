import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movies/movie.entity';
import { Content } from './content.entity';
import { ContentUnion } from './content.types';
import { BaseService } from '../common/base/base.service';

@Injectable()
export class ContentsService extends BaseService<Content, Content, Content> {
    constructor(
        @InjectRepository(Content)
        private readonly contentsRepository: Repository<Content>
    ) {
        super(contentsRepository);
    }

    async findOne(id: number, filters: FindOptionsWhere<Movie> = {}, relations: string[] = []): Promise<typeof ContentUnion> {
        const content = await this.contentsRepository.findOne({
            where: { id, ...filters },
            relations
        });
        return content;
    }

    async findAll(filters: FindOptionsWhere<Movie> = {}, relations: string[] = []): Promise<Array<typeof ContentUnion>> {
        const contents = await this.contentsRepository.find({
            where: filters,
            relations
        });
        return contents;
    }
}
