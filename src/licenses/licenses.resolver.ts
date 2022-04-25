import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LicensesService } from './licenses.service';
import { License } from './license.entity';
import { CreateLicenseInput } from './dto/create-license.input';
import { UpdateLicenseInput } from './dto/update-license.input';
import { BaseResolver } from '../common/base/base.resolver';
import { UseFilters, UseGuards } from '@nestjs/common';
import { CustomErrorFilter } from '../common/errors/custom-error.filter';
import { GqlUserGuard, User } from '../security/auth/auth.guard';
import { UserPayload } from '../security/auth/user-payload';

@Resolver(() => License)
@UseFilters(new CustomErrorFilter())
export class LicensesResolver extends BaseResolver(License, CreateLicenseInput, UpdateLicenseInput) {
    constructor(private readonly licensesService: LicensesService) {
        super(licensesService);
    }
    @Mutation(() => License, { name: 'createLicense' })
    create(@Args('createLicenseInput') createLicenseInput: CreateLicenseInput) {
        return this.licensesService.create(createLicenseInput);
    }

    @Query(() => [License], { name: `licenses` })
    @UseGuards(GqlUserGuard)
    async findAll(@User() user?: UserPayload) {
        return this.licensesService.findAll({}, ['content'], user?.userId);
    }

    @Query(() => License, { name: `license` })
    @UseGuards(GqlUserGuard)
    async findOne(@Args('id', { type: () => Int }) id: number, @User() user?: UserPayload) {
        return this.licensesService.findOne(id, {}, ['content'], user?.userId);
    }
}
