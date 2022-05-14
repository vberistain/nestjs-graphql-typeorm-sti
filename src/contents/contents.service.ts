import { Injectable } from '@nestjs/common';
import { createQueryBuilder, DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError } from '@customErrors';
import { Playlist } from './playlists/playlist.entity';
import { Movie } from './movies/movie.entity';
import { Content } from './content.entity';
import { ContentUnion } from './content.type';

@Injectable()
export class ContentsService {
    @InjectRepository(Content)
    private readonly repository: Repository<Content>;

    async findOne(id: number): Promise<typeof ContentUnion> {
        const content = await this.repository.findOne({
            where: { id },
            relations: ['contents', 'playbacks', 'inContents', 'contents.inContents']
        });
        return content;
    }

    async findAll(): Promise<Array<typeof ContentUnion>> {
        const contents = await this.repository.find({
            relations: ['contents', 'playbacks', 'inContents', 'contents.inContents']
        });
        return contents;
    }
}
