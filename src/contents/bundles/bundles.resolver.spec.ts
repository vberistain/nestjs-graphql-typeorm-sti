import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../../test/utils';
import { Bundle } from './bundle.entity';
import { BundlesResolver } from './bundles.resolver';
import { BundlesService } from './bundles.service';
import bundleFixture from './fixtures/playlist.fixture';

describe('BundlesResolver', () => {
    let resolver: BundlesResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BundlesResolver,
                BundlesService,
                {
                    provide: getRepositoryToken(Bundle),
                    useFactory: repositoryMockFactory(bundleFixture)
                }
            ]
        }).compile();

        resolver = module.get<BundlesResolver>(BundlesResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
