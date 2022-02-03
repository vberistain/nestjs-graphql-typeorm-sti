import { Resolver } from '@nestjs/graphql';
import { CreateLivestreamInput } from './dto/create-livestream.input';
import { UpdateLivestreamInput } from './dto/update-livestream.input';
import { Livestream } from './livestream.entity';
import { LivestreamsService } from './livestreams.service';
import { BaseResolver } from '../../common/base/base.resolver';

@Resolver(() => Livestream)
export class LivestreamsResolver extends BaseResolver(Livestream, CreateLivestreamInput, UpdateLivestreamInput) {
    constructor(private readonly livestreamsService: LivestreamsService) {
        super(livestreamsService);
    }
}
