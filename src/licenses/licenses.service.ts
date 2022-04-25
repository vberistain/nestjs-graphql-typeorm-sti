import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DuplicatedEntityError } from '@customErrors';
import MySQLErrors from '../common/errors/mysql-errors';
import { UpdatePlaybackInput } from '../playbacks/dto/update-playback.input';
import { CreateLicenseInput } from './dto/create-license.input';
import { License } from './license.entity';

@Injectable()
export class LicensesService {
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>;

    async create(createLicenseInput: CreateLicenseInput) {
        try {
            return await this.licenseRepository.save(createLicenseInput);
        } catch (e) {
            if (e.code === MySQLErrors.DuplicatedEntryError) {
                throw new DuplicatedEntityError('License exists already');
            }
            throw e;
        }
    }

    async findAll(filters: { [key: string]: any } = {}, relations: string[] = [], userId?: number): Promise<License[]> {
        const query = this.licenseRepository.createQueryBuilder('license');
        if (relations.includes('content')) {
            query.leftJoinAndSelect('license.content', 'content');
        }
        query.where(`userId = :userId`, { userId });
        return query.getMany();
    }

    findOne(id: number, filters: { [key: string]: any } = {}, relations: string[] = [], userId?: number) {
        const query = this.licenseRepository.createQueryBuilder('license');
        if (relations.includes('content')) {
            query.leftJoinAndSelect('license.content', 'content');
        }
        query.where(`license.id = :id`, { id });
        if (userId) {
            query.andWhere(`userId = :userId`, { userId });
        }
        return query.getOne();
    }

    update(id: number, updateLicenseInput: UpdatePlaybackInput) {
        return this.licenseRepository.update(id, updateLicenseInput);
    }

    remove(id: number) {
        return this.licenseRepository.delete(id);
    }
}
