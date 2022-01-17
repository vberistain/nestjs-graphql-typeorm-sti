import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateContentInput } from '../dto/update-content.input';
import { CreateMovieInput } from './dto/create-movie.input';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>
    ) {}
    async create(createMovieInput: CreateMovieInput) {
        const res = await this.movieRepository.save(createMovieInput);
        return res;
    }

    findAll() {
        return this.movieRepository.find({});
    }

    findOne(id: number) {
        return this.movieRepository.findOne(id);
    }

    update(id: number, updateContentInput: UpdateContentInput) {
        return this.movieRepository.update(id, updateContentInput);
    }

    remove(id: number) {
        return this.movieRepository.delete(id);
    }
}
