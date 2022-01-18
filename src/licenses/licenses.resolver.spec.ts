import { Test, TestingModule } from '@nestjs/testing';
import { LicensesResolver } from './licenses.resolver';
import { LicensesService } from './licenses.service';

describe('LicensesResolver', () => {
  let resolver: LicensesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicensesResolver, LicensesService],
    }).compile();

    resolver = module.get<LicensesResolver>(LicensesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
