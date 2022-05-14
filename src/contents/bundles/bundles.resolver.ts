import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BundlesService } from './bundles.service';
import { BaseResolver } from '@common/base/base.resolver';
import { Bundle } from './bundle.entity';
import { CreateBundleInput } from './dto/create-bundle.input';
import { UpdateBundleInput } from './dto/update-bundle.input';

@Resolver(() => Bundle)
export class BundlesResolver extends BaseResolver(Bundle, CreateBundleInput, UpdateBundleInput) {
    constructor(private readonly bundlesService: BundlesService) {
        super(bundlesService);
    }

    @Query(() => Bundle, { name: 'bundle' })
    async findOne(@Args('id', { type: () => Int }) id: number): Promise<Bundle> {
        return this.bundlesService.findOne(id, {}, ['contents', 'contents.contents']);
    }

    @Query(() => [Bundle], { name: 'bundles' })
    async findAll(): Promise<Bundle[]> {
        return this.bundlesService.findAll({}, ['contents']);
    }

    @Mutation(() => Bundle, { name: 'createBundle' })
    async create(@Args('createBundleInput') createBundleInput: CreateBundleInput): Promise<Bundle> {
        return this.bundlesService.create(createBundleInput);
    }
}
