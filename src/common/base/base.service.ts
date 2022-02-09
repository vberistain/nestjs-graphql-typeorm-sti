import { Injectable } from '@nestjs/common';
import { FindConditions, In, Repository } from 'typeorm';
import { EntityNotFoundError, RelatedEntityNotFoundError } from '../errors/custom-errors';

export interface IBaseService<Entity, CreateEntity, UpdateEntity> {
    findAll(filters?: FindConditions<Entity>): Promise<Entity[]>;
    findOne(id: number, filters?: FindConditions<Entity>, relations?: string[]): Promise<Entity>;
    update(id: number, entity: UpdateEntity): Promise<Entity>;
    create(entity: CreateEntity): Promise<Entity>;
    remove(id: number);
    findByIds(ids: number[], filters: FindConditions<Entity>): Promise<Entity[]>;
}

@Injectable()
export class BaseService<Entity, CreateEntity, UpdateEntity> implements IBaseService<Entity, CreateEntity, UpdateEntity> {
    constructor(private readonly genericRepository: Repository<Entity>) {}

    async create(entity: CreateEntity): Promise<Entity> {
        return this.genericRepository.save(entity);
    }

    async findAll(filters: FindConditions<Entity>, relations: string[] = []): Promise<Entity[]> {
        return this.genericRepository.find({ where: filters, relations: relations });
    }

    async findOne(id: number, filters?: FindConditions<Entity>, relations?: string[]): Promise<Entity> {
        const entity = await this.genericRepository.findOne(id);
        if (!entity) {
            throw new EntityNotFoundError();
        }
        return entity;
    }

    async remove(id: number) {
        const res = await this.genericRepository.delete(id);
        if (res.affected < 1) {
            throw new EntityNotFoundError();
        }
    }

    async update(id: number, entity: UpdateEntity): Promise<Entity> {
        try {
            const res = await this.genericRepository.update(id, { ...entity });
            if (res.affected < 1) {
                throw new EntityNotFoundError('Entity Not Found');
            }
            return this.findOne(id);
        } catch (e) {
            if (e.code.includes('ER_NO_REFERENCED')) {
                throw new RelatedEntityNotFoundError();
            }
            throw e;
        }
    }

    async findByIds(ids: number[], filters: FindConditions<Entity> = {}): Promise<Entity[]> {
        console.log(ids, filters);
        return this.genericRepository.find({ where: { id: In(ids), ...filters } });
    }
}
