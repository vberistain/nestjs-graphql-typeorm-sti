import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { repositorySpies, repositoryMockFactory } from '@test/utils';
import { AuthService } from '../security/auth/auth.service';
import createLicenseInputFixture from './fixtures/create-license.fixture';
import licenseFixture from './fixtures/license.fixture';
import updateLicenseInputFixture from './fixtures/update-license.fixture';
import { License } from './license.entity';
import { LicensesService } from './licenses.service';

describe('LicensesService', () => {
    let service: LicensesService;
    let repository: Repository<License>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LicensesService,
                AuthService,
                {
                    provide: getRepositoryToken(License),
                    useFactory: repositoryMockFactory(licenseFixture)
                }
            ]
        }).compile();

        service = module.get<LicensesService>(LicensesService);
        repository = module.get<Repository<License>>(getRepositoryToken(License));
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should call repository.save with the right parameters and return the result', async () => {
            const res = await service.create(createLicenseInputFixture);
            expect(repositorySpies.save).toHaveBeenCalledWith(createLicenseInputFixture);
            expect(res).toEqual(createLicenseInputFixture);
        });
    });

    describe('findAll', () => {
        it('should call repository.getMany with the right parameters and return the result', async () => {
            const res = await service.findAll();
            expect(repositorySpies.createQueryBuilder.getMany).toHaveBeenCalled();
            expect(res).toEqual([licenseFixture]);
        });
    });

    describe('findOne', () => {
        it('should call repository.findOne with the right parameters and return the result', async () => {
            const res = await service.findOne(1, {}, ['content'], 2);
            expect(repositorySpies.createQueryBuilder.where).toHaveBeenCalledWith(`license.id = :id`, { id: 1 });
            expect(repositorySpies.createQueryBuilder.andWhere).toHaveBeenCalledWith(`userId = :userId`, { userId: 2 });
            expect(repositorySpies.createQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('license.content', 'content');
            expect(repositorySpies.createQueryBuilder.getOne).toHaveBeenCalledWith();
            expect(res).toEqual(licenseFixture);
        });

        it('should call repository.findOne with the right parameters', async () => {
            await service.findOne(1, {}, [], undefined);
            expect(repositorySpies.createQueryBuilder.where).toHaveBeenCalledWith(`license.id = :id`, { id: 1 });
            expect(repositorySpies.createQueryBuilder.leftJoinAndSelect).toHaveBeenCalledTimes(0);
            expect(repositorySpies.createQueryBuilder.getOne).toHaveBeenCalledWith();
        });
    });

    describe('delete', () => {
        it('should call repository.delete with the right parameters', async () => {
            await service.remove(1);
            expect(repository.delete).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should call repository.update with the right parameters', async () => {
            await service.update(1, updateLicenseInputFixture);
            expect(repository.update).toHaveBeenCalledWith(1, updateLicenseInputFixture);
        });
    });
});
