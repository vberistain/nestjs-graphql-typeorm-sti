import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { EntityNotFoundError } from '@customErrors';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './movie.entity';
import { BaseService } from '@common/base/base.service';

@Injectable()
export class MoviesService extends BaseService<Movie, CreateMovieInput, UpdateMovieInput> {
    constructor(
        @InjectRepository(Movie)
        private readonly moviesRepository: Repository<Movie>
    ) {
        super(moviesRepository);
    }
}
