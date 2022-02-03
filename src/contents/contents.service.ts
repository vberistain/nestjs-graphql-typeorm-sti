import { Injectable } from '@nestjs/common';
import { createQueryBuilder } from 'typeorm';
import { ContentUnion } from './contents.resolver';
import { EntityNotFoundError } from '../common/errors/custom-errors';
import { Movie } from './movies/movie.entity';
import { Playlist } from './playlists/playlist.entity';
import { Livestream } from './livestreams/livestream.entity';

@Injectable()
export class ContentsService {
    async findOne(id: number): Promise<typeof ContentUnion> {
        const content = <Movie | Playlist | Livestream>(
            await createQueryBuilder('content').where({ id }).leftJoinAndSelect('Content.contents', 'contents').getOne()
        );
        if (!content) {
            throw new EntityNotFoundError();
        }

        return content;
    }

    async findAll(): Promise<[typeof ContentUnion]> {
        const contents = <[Movie | Playlist | Livestream]>(
            await createQueryBuilder('content').leftJoinAndSelect('Content.contents', 'contents').getMany()
        );

        return contents;
    }
}
