import { Injectable } from '@nestjs/common';
import { createQueryBuilder, DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ContentUnion } from './contents.resolver';
import { EntityNotFoundError } from '../common/errors/custom-errors';
import { Playlist } from './playlists/playlist.entity';
import { Movie } from './movies/movie.entity';
import { Content } from './content.entity';

@Injectable()
export class ContentsService {
    @InjectDataSource()
    private readonly dataSource: DataSource;

    async findOne(id: number): Promise<typeof ContentUnion> {
        const content = <Movie | Playlist>(
            await createQueryBuilder(Content, 'content')
                .where('content.id = :id', { id })
                .leftJoinAndSelect('content_contents', 'contents')
                .getRawOne()
        );
        if (!content) {
            throw new EntityNotFoundError();
        }

        return content;
    }

    async findAll(): Promise<[typeof ContentUnion]> {
        const contents = await this.dataSource.getRepository(Content).find({ relations: ['contents', 'playbacks'] });
        return contents as any;
    }
}
