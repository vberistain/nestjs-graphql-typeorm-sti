import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentType } from '../content.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>;

    async create(createMovieInput: CreateMovieInput) {
        return await this.moviesRepository.save({ ...createMovieInput, type: ContentType.movie });
    }

    findAll() {
        return this.moviesRepository.find({});
    }

    findOne(id: number) {
        return this.moviesRepository.findOne(id);
    }

    // update(id: number, updateContentInput: UpdateContentInput) {
    //     return this.movieRepository.update(id, updateContentInput);
    // }

    remove(id: number) {
        return this.moviesRepository.delete(id);
    }
}
