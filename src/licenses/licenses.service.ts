import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLicenseInput } from './dto/create-license.input';
import { License } from './license.entity';

@Injectable()
export class LicensesService {
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>;

    create(createLicenseInput: CreateLicenseInput) {
        return this.licenseRepository.save(createLicenseInput);
    }

    findAll() {
        return this.licenseRepository.find();
    }

    findOne(id: number) {
        return this.licenseRepository.findOne(id);
    }

    remove(id: number) {
        return this.licenseRepository.delete(id);
    }
}
