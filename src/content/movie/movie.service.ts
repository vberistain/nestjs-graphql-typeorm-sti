import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { CreateMovieInput } from './dto/create-movie.input';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: EntityRepository<Movie>
    ) {}
    async create(createMovieInput: CreateMovieInput) {
        const res = await this.movieRepository.create(createMovieInput);
        await this.movieRepository.persistAndFlush(res);
        return res;
    }

    findAll() {
        return this.movieRepository.find({});
    }

    findOne(id: number) {
        return this.movieRepository.findOne(id);
    }

    // update(id: number, updateContentInput: UpdateContentInput) {
    //     return this.contentRepository.nativeUpdate(id, updateContentInput);
    // }

    remove(id: number) {
        return this.movieRepository.nativeDelete(id);
    }
}
