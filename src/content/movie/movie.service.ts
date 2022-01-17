import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentType } from '../content.entity';
import { UpdateContentInput } from '../dto/update-content.input';
import { CreateMovieInput } from './dto/create-movie.input';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
    async create(createMovieInput: CreateMovieInput) {
        return await this.movieRepository.save({ ...createMovieInput, type: ContentType.movie });
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
