import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePlaybackInput } from '../playbacks/dto/update-playback.input';
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

    update(id: number, updateLicenseInput: UpdatePlaybackInput) {
        return this.licenseRepository.update(id, updateLicenseInput);
    }

    remove(id: number) {
        return this.licenseRepository.delete(id);
    }
}
