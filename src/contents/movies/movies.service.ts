import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, FindOptionsWhere, FindOptionsRelations } from 'typeorm';
import { Movie } from './movie.entity';
import { EntityNotFoundError } from '@customErrors';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { BaseService } from '@common/base/base.service';

interface DBFilters {
    [key: string]: any;
}
@Injectable()
export class MoviesService extends BaseService<Movie, CreateMovieInput, UpdateMovieInput> {
    constructor(
        @InjectRepository(Movie)
        private readonly moviesRepository: Repository<Movie>
    ) {
        super(moviesRepository);
    }

    private addFiltersToQuery(filters: DBFilters, query: SelectQueryBuilder<Movie>) {
        if (Object.keys(filters).length) {
            for (let key in filters) {
                query.andWhere(`${key} = :var`, { var: filters[key] });
            }
        }
    }

    async findOne(id: number, filters: DBFilters = {}, relations: string[] = [], userId?: number): Promise<Movie> {
        const query = this.moviesRepository.createQueryBuilder('movie');
        if (userId && relations.includes('playbacks')) {
            query.leftJoinAndSelect('movie.playbacks', 'playbacks', 'playbacks.userId = :userId', { userId });
        }
        if (userId && relations.includes('licenses')) {
            query.leftJoinAndSelect('movie.licenses', 'licenses', 'licenses.userId = :userId', { userId });
        }
        if (relations.includes('inContents')) {
            query.leftJoinAndSelect('movie.inContents', 'inContents');
        }
        query.where('movie.id = :id', { id });
        this.addFiltersToQuery(filters, query);
        const movie = await query.getOne();
        if (!movie) {
            throw new EntityNotFoundError('Movie Not Found');
        }
        return movie;
    }

    async findAll(filters: DBFilters = {}, relations: string[] = [], userId?: number): Promise<Movie[]> {
        const query = this.moviesRepository.createQueryBuilder('movie');
        if (userId && relations.includes('playbacks')) {
            query.leftJoinAndSelect('movie.playbacks', 'playbacks', 'playbacks.userId = :userId', { userId });
        }
        if (userId && relations.includes('licenses')) {
            query.leftJoinAndSelect('movie.licenses', 'licenses', 'licenses.userId = :userId', { userId });
        }
        if (relations.includes('inContents')) {
            query.leftJoinAndSelect('movie.inContents', 'inContents');
        }
        this.addFiltersToQuery(filters, query);
        return query.getMany();
    }
}
