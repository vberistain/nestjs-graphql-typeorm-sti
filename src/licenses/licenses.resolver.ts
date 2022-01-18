import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LicensesService } from './licenses.service';
import { License } from './entities/license.entity';
import { CreateLicenseInput } from './dto/create-license.input';
import { UpdateLicenseInput } from './dto/update-license.input';

@Resolver(() => License)
export class LicensesResolver {
  constructor(private readonly licensesService: LicensesService) {}

  @Mutation(() => License)
  createLicense(@Args('createLicenseInput') createLicenseInput: CreateLicenseInput) {
    return this.licensesService.create(createLicenseInput);
  }

  @Query(() => [License], { name: 'licenses' })
  findAll() {
    return this.licensesService.findAll();
  }

  @Query(() => License, { name: 'license' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.licensesService.findOne(id);
  }

  @Mutation(() => License)
  updateLicense(@Args('updateLicenseInput') updateLicenseInput: UpdateLicenseInput) {
    return this.licensesService.update(updateLicenseInput.id, updateLicenseInput);
  }

  @Mutation(() => License)
  removeLicense(@Args('id', { type: () => Int }) id: number) {
    return this.licensesService.remove(id);
  }
}
