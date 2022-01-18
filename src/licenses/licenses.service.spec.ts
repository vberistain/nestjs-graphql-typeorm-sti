import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import createLicenseInputFixture from './dto/create-license.fixture';
import { License } from './license.entity';
import licenseFixture from './license.fixture';
import { LicensesResolver } from './licenses.resolver';
import { LicensesService } from './licenses.service';

describe('LicensesService', () => {
    let service: LicensesService;
    let repository: Repository<License>;

    const mockRepo: Partial<Repository<License>> = {
        find: jest.fn(async () => [licenseFixture]),
        save: jest.fn(async (licenseFixture: any) => licenseFixture),
        findOne: jest.fn(async () => licenseFixture),
        delete: jest.fn(async () => ({ raw: {} }))
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LicensesResolver,
                LicensesService,
                {
                    provide: getRepositoryToken(License),
                    useValue: mockRepo
                }
            ]
        }).compile();

        service = module.get<LicensesService>(LicensesService);
        repository = module.get<Repository<License>>(getRepositoryToken(License));
    });

    describe('create', () => {
        it('should call repository.save with the right parameters and return the result', async () => {
            const res = await service.create(createLicenseInputFixture);
            expect(repository.save).toHaveBeenCalledWith(createLicenseInputFixture);
            expect(res).toEqual(createLicenseInputFixture);
        });
    });

    describe('findAll', () => {
        it('should call repository.find with the right parameters and return the result', async () => {
            const res = await service.findAll();
            expect(repository.find).toHaveBeenCalledWith();
            expect(res).toEqual([licenseFixture]);
        });
    });

    describe('findOne', () => {
        it('should call repository.findOne with the right parameters and return the result', async () => {
            const res = await service.findOne(1);
            expect(repository.findOne).toHaveBeenCalledWith(1);
            expect(res).toEqual(licenseFixture);
        });
    });

    describe('delete', () => {
        it('should call repository.delete with the right parameters', async () => {
            await service.remove(1);
            expect(repository.delete).toHaveBeenCalledWith(1);
        });
    });
});
