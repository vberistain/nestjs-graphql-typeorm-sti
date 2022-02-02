import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from '../errors/custom-errors';

export interface IBaseService<Entity, CreateEntity, UpdateEntity> {
    findAll(): Promise<Entity[]>;
    findOne(id: number): Promise<Entity>;
    update(id: number, entity: UpdateEntity): Promise<Entity>;
    create(entity: CreateEntity): Promise<Entity>;
    remove(id: number);
}

@Injectable()
export class BaseService<Entity, CreateEntity, UpdateEntity> implements IBaseService<Entity, CreateEntity, UpdateEntity> {
    constructor(private readonly genericRepository: Repository<Entity>) {}

    create(entity: CreateEntity): Promise<Entity> {
        return this.genericRepository.save(entity);
    }

    findAll(): Promise<Entity[]> {
        return this.genericRepository.find();
    }

    async findOne(id: number): Promise<Entity> {
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
        const res = await this.genericRepository.update(id, { ...entity });
        if (res.affected < 1) {
            throw new EntityNotFoundError('Entity Not Found');
        }
        return this.findOne(id);
    }
}
