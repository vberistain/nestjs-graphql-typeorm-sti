import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateLivestreamInput } from './dto/create-livestream.input';
import { Livestream } from './livestream.entity';
import { LivestreamService } from './livestream.service';

@Resolver(() => Livestream)
export class LivestreamResolver {
    constructor(private readonly livestreamService: LivestreamService) { }

    @Mutation(() => Livestream)
    async createLivestream(@Args('createLivestreamInput') createLivestreamInput: CreateLivestreamInput) {
        return await this.livestreamService.create(createLivestreamInput);
    }

    @Query(() => [Livestream], { name: 'livestreams' })
    findAll() {
        return this.livestreamService.findAll();
    }

    @Query(() => Livestream, { name: 'livestream' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.livestreamService.findOne(id);
    }

    // @Mutation(() => Livestream)
    // updateLivestream(
    //     @Args('updateLivestreamInput') updateLivestreamInput: UpdateLivestreamInput,
    // ) {
    //     return this.livestreamService.update(
    //         updateLivestreamInput.id,
    //         updateLivestreamInput,
    //     );
    // }

    @Mutation(() => Livestream)
    removeLivestream(@Args('id', { type: () => Int }) id: number) {
        return this.livestreamService.remove(id);
    }
}
