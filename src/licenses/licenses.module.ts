import { Module } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { LicensesResolver } from './licenses.resolver';

@Module({
  providers: [LicensesResolver, LicensesService]
})
export class LicensesModule {}
