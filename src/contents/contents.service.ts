import { Injectable } from '@nestjs/common';
import { createQueryBuilder } from 'typeorm';
import { ContentUnion } from './contents.resolver';
import { EntityNotFoundError } from '../common/errors/custom-errors';
import { Playlist } from './playlists/playlist.entity';
import { Movie } from './movies/movie.entity';

@Injectable()
export class ContentsService {
    async findOne(id: number): Promise<typeof ContentUnion> {
        const content = <Movie | Playlist>(
            await createQueryBuilder('content').where({ id }).leftJoinAndSelect('Content.contents', 'contents').getOne()
        );
        if (!content) {
            throw new EntityNotFoundError();
        }

        return content;
    }

    async findAll(): Promise<[typeof ContentUnion]> {
        const contents = <[Movie | Playlist]>(
            await createQueryBuilder('content')
                .leftJoinAndSelect('Content.contents', 'contents')
                .leftJoinAndSelect('Content.playbacks', 'playbacks')
                .getMany()
        );

        return contents;
    }
}
