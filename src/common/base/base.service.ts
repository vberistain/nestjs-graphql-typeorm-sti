import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { EntityNotFoundError, RelatedEntityNotFoundError } from '@customErrors';
import MySQLErrors from '../errors/mysql-errors';

export interface IBaseService<Entity, CreateEntity, UpdateEntity> {
    findAll(filters?: FindOptionsWhere<Entity>): Promise<Entity[]>;
    findOne(id: number, filters?: FindOptionsWhere<Entity>, relations?: string[]): Promise<Entity>;
    update(id: number, entity: UpdateEntity): Promise<Entity>;
    create(entity: CreateEntity): Promise<Entity>;
    remove(id: number);
    findByIds(ids: number[], filters: FindOptionsWhere<Entity>): Promise<Entity[]>;
}

@Injectable()
export class BaseService<Entity, CreateEntity, UpdateEntity> implements IBaseService<Entity, CreateEntity, UpdateEntity> {
    constructor(private readonly genericRepository: Repository<Entity>) {}

    async create(entity: any): Promise<Entity> {
        await this.genericRepository.save(entity);
        //@TODO: find an alternative to insert and return the whole object, since type is not returned when repo.save(entity). This is dangerous
        return await this.genericRepository.findOne({ where: entity });
    }

    async findAll(filters: FindOptionsWhere<Entity> = {}, relations: string[] = []): Promise<Entity[]> {
        return this.genericRepository.find({ where: filters, relations: relations });
    }

    async findOne(id: number, filters: FindOptionsWhere<Entity> = {}, relations: string[] = []): Promise<Entity> {
        const entity = await this.genericRepository.findOne({ where: { id: id, ...filters }, relations: relations });
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
                throw new EntityNotFoundError();
            }
            return this.findOne(id);
        } catch (error) {
            if (error.code === MySQLErrors.ForeignKeyConstrainError || error.code === MySQLErrors.ForeignKeyConstrain2Error) {
                throw new RelatedEntityNotFoundError();
            }
            throw error;
        }
    }

    async findByIds(ids: number[], filters: FindOptionsWhere<Entity> = {}): Promise<Entity[]> {
        return this.genericRepository.find({ where: { id: In(ids), ...filters } });
    }
}
