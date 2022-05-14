import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseService } from '@common/base/base.service';
import { Bundle } from './bundle.entity';
import { CreateBundleInput } from './dto/create-bundle.input';
import { UpdateBundleInput } from './dto/update-bundle.input';
import { EntityNotFoundError } from '../../common/errors/custom-errors';

@Injectable()
export class BundlesService extends BaseService<Bundle, CreateBundleInput, UpdateBundleInput> {
    constructor(
        @InjectRepository(Bundle)
        private readonly bundleRepository: Repository<Bundle>
    ) {
        super(bundleRepository);
    }

    async findAll(filters?: FindOptionsWhere<Bundle>, relations?: string[]): Promise<Bundle[]> {
        return this.bundleRepository.find({ where: filters, relations });
    }

    async findOne(id: number, filters?: FindOptionsWhere<Bundle>, relations?: string[]): Promise<Bundle> {
        const entity = await this.bundleRepository.findOne({ where: { id: id, ...filters }, relations: relations });
        if (!entity) {
            throw new EntityNotFoundError();
        }
        return entity;
    }
}
