import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Entity, Repository } from 'typeorm';
import { BaseService } from '../src/common/base/base.service';

@Entity()
export class TestEntity {
    @Column()
    id: number;
    @Column()
    prop: string;
}

export class EntityCreateInput {
    prop: string;
}

export class EntityUpdateInput {
    prop: string;
}

export const entityFixture = {
    id: 1,
    prop: 'Prop'
};

@Injectable()
export class TestService extends BaseService<TestEntity, EntityCreateInput, EntityUpdateInput> {
    constructor(
        @InjectRepository(TestEntity)
        private readonly testRepository: Repository<TestEntity>
    ) {
        super(testRepository);
    }
}
