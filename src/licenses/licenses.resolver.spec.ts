import { Test, TestingModule } from '@nestjs/testing';
import { serviceMockFactory } from '../../test/utils';
import { UpdateLicenseInput } from './dto/update-license.input';
import licenseFixture from './license.fixture';
import { LicensesResolver } from './licenses.resolver';
import { LicensesService } from './licenses.service';

describe('LicensesResolver', () => {
    let resolver: LicensesResolver;
    let service: LicensesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LicensesResolver, { provide: LicensesService, useFactory: serviceMockFactory(licenseFixture) }]
        }).compile();

        resolver = module.get<LicensesResolver>(LicensesResolver);
        service = module.get<LicensesService>(LicensesService);
    });

    describe('createLicense', () => {
        it('should call LicensesService.create', async () => {
            await resolver.createLicense(licenseFixture);
            expect(service.create).toHaveBeenCalledWith(licenseFixture);
        });
    });

    describe('findLicenses', () => {
        it('should call LicensesService.findAll', async () => {
            await resolver.findLicenses();
            expect(service.findAll).toHaveBeenCalledWith();
        });
    });

    describe('findLicense', () => {
        it('should call LicensesService.findOne', async () => {
            await resolver.findLicense(1);
            expect(service.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should call LicensesService.update', async () => {
            const input: UpdateLicenseInput = { id: licenseFixture.id, expireDate: new Date() };
            await resolver.updateLicense(input);
            expect(service.update).toHaveBeenCalledWith(licenseFixture.id, input);
        });
    });

    describe('delete', () => {
        it('should call LicensesService.delete', async () => {
            await resolver.removeLicense(1);
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
