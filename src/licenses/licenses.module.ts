import { Module } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { LicensesResolver } from './licenses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { License } from './license.entity';
import { Content } from '../contents/content.entity';
import { Movie } from '../contents/movies/movie.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Content, License, Movie])],
    providers: [LicensesResolver, LicensesService]
})
export class LicensesModule {}
