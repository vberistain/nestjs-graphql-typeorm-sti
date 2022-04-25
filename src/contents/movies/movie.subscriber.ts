import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { Movie } from './movie.entity';

@EventSubscriber()
export class MovieSubscriber implements EntitySubscriberInterface<Movie> {
    listenTo() {
        return Movie;
    }

    afterLoad(entity: Movie) {
        if (entity.playbacks) {
            entity.playback = entity.playbacks[0];
        }
    }
}
