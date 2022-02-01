import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from '@customErrors';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>;

    create(createMovieInput: CreateMovieInput) {
        return this.moviesRepository.save(createMovieInput);
    }

    findAll() {
        return this.moviesRepository.find({});
    }

    findOne(id: number) {
        return this.moviesRepository.findOne(id);
    }

    async update(id: number, updateMovieInput: UpdateMovieInput) {
        const res = await this.moviesRepository.update(id, { ...updateMovieInput });
        if (res.affected < 1) {
            throw new EntityNotFoundError('Movie Not Found');
        }
        return this.findOne(id);
    }

    remove(id: number) {
        return this.moviesRepository.delete(id);
    }
}
