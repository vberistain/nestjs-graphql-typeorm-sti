import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../../test/utils';
import { Bundle } from './bundle.entity';
import { BundlesService } from './bundles.service';
import bundleFixture from './fixtures/playlist.fixture';

describe('BundlesService', () => {
    let service: BundlesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BundlesService,
                {
                    provide: getRepositoryToken(Bundle),
                    useFactory: repositoryMockFactory(bundleFixture)
                }
            ]
        }).compile();

        service = module.get<BundlesService>(BundlesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
