import { Module } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { LicensesResolver } from './licenses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { License } from './license.entity';
import { Content } from '../content/content.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Content, License])],
    providers: [LicensesResolver, LicensesService]
})
export class LicensesModule {}
