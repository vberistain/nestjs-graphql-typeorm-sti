import { EntitySubscriberInterface, EventSubscriber, LoadEvent } from 'typeorm';
import { Content } from './content.entity';

@EventSubscriber()
export class ContentSubscriber implements EntitySubscriberInterface<Content> {
    listenTo() {
        return Content;
    }

    afterLoad(entity: Content) {
        if (entity.licenses) {
            entity.license = entity.licenses[0];
        }
    }
}
