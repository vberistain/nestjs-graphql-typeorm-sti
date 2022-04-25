import { IMovie } from '../contents/movies/movie.interface';

export class IPlayback {
    id: number;
    userId: number;
    position: number;
    finished: boolean;
    started: boolean;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
    content: IMovie;
}
