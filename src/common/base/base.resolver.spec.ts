import { Resolver } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { serviceMockFactory } from '../../../test/utils';
import { AuthService } from '../../security/auth/auth.service';
import { userPayload } from '../../security/auth/user-payload.fixture';
import { BaseResolver } from './base.resolver';
import { BaseService } from './base.service';

class TestEntity {
    id: number;
    prop: string;
}

class EntityCreateInput {
    prop: string;
}

class EntityUpdateInput {
    prop: string;
}

const entityFixture = {
    id: 1,
    prop: 'Prop'
};

@Resolver(() => TestEntity)
class TestResolver extends BaseResolver(TestEntity, EntityCreateInput, EntityUpdateInput) {
    constructor(private readonly baseService: BaseService<TestEntity, EntityCreateInput, EntityUpdateInput>) {
        super(baseService);
    }
}

describe('BaseResolver', () => {
    let resolver: TestResolver;
    let service: BaseService<TestEntity, EntityCreateInput, EntityUpdateInput>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TestResolver, AuthService, { provide: BaseService, useFactory: serviceMockFactory(entityFixture) }]
        }).compile();

        resolver = module.get<TestResolver>(TestResolver);
        service = module.get<BaseService<TestEntity, EntityCreateInput, EntityUpdateInput>>(BaseService);
    });

    describe('createTestEntity', () => {
        it('should call BaseService.create', async () => {
            await resolver.create(entityFixture);
            expect(service.create).toHaveBeenCalledWith(entityFixture);
        });
    });

    describe('testentitys', () => {
        it('should call BaseService.findAll', async () => {
            await resolver.findAll();
            expect(service.findAll).toHaveBeenCalledWith();
        });
    });

    describe('testentity', () => {
        it('should call BaseService.findOne', async () => {
            await resolver.findOne(1);
            expect(service.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should call BaseService.update', async () => {
            const input: EntityUpdateInput = { prop: 'Some prop' };
            const res = await resolver.update(entityFixture.id, input);
            expect(service.update).toHaveBeenCalledWith(entityFixture.id, input);
        });
    });

    describe('deleteBase', () => {
        it('should call BaseService.delete', async () => {
            await resolver.remove(1);
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
