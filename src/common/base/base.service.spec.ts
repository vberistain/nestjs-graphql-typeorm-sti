import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { entityFixture, TestEntity, TestService } from '../../../test/test.service';
import { repositoryMockFactory, repositorySpies } from '../../../test/utils';

describe('BaseService', () => {
    let service: TestService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TestService,
                {
                    provide: getRepositoryToken(TestEntity),
                    useFactory: repositoryMockFactory(entityFixture)
                }
            ]
        }).compile();

        service = module.get<TestService>(TestService);
        jest.clearAllMocks();
    });

    xdescribe('create', () => {
        it('should call repository.save with the right parameters', async () => {
            const res = await service.create(entityFixture);
            expect(repositorySpies.insert).toHaveBeenCalledWith(entityFixture);
            expect(repositorySpies.findOne).toHaveBeenCalledWith({ where: entityFixture });
            expect(res).toEqual(entityFixture);
        });
    });

    describe('findAll', () => {
        it('should call repository.find with the right parameters and return the result', async () => {
            const res = await service.findAll({ prop: 'Prop' }, ['playback']);
            expect(repositorySpies.find).toHaveBeenCalledWith({ where: { prop: 'Prop' }, relations: ['playback'] });
            expect(res).toEqual([entityFixture]);
        });
    });

    describe('findOne', () => {
        it('should call repository.findOne with the right parameters and return the result', async () => {
            const res = await service.findOne(1, {});
            expect(repositorySpies.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: [] });
            expect(res).toEqual(entityFixture);
        });
    });

    describe('update', () => {
        it('should call repository.update with the right parameters and return the result', async () => {
            const res = await service.update(1, entityFixture);
            expect(repositorySpies.update).toHaveBeenCalledWith(1, entityFixture);
            expect(res).toEqual(entityFixture);
        });
    });

    describe('delete', () => {
        it('should call repository.delete with the right parameters', async () => {
            await service.remove(1);
            expect(repositorySpies.delete).toHaveBeenCalledWith(1);
        });
    });
});
