import { Injectable } from '@nestjs/common';
import { CreateLicenseInput } from './dto/create-license.input';
import { UpdateLicenseInput } from './dto/update-license.input';

@Injectable()
export class LicensesService {
  create(createLicenseInput: CreateLicenseInput) {
    return 'This action adds a new license';
  }

  findAll() {
    return `This action returns all licenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} license`;
  }

  update(id: number, updateLicenseInput: UpdateLicenseInput) {
    return `This action updates a #${id} license`;
  }

  remove(id: number) {
    return `This action removes a #${id} license`;
  }
}
