import { Test, TestingModule } from '@nestjs/testing';
import { serviceMockFactory } from '../../test/utils';
import { GqlUserGuard } from '../security/auth/auth.guard';
import { AuthService } from '../security/auth/auth.service';
import { UserPayload } from '../security/auth/user-payload';
import { UpdateLicenseInput } from './dto/update-license.input';
import licenseFixture from './fixtures/license.fixture';
import { LicensesResolver } from './licenses.resolver';
import { LicensesService } from './licenses.service';

describe('LicensesResolver', () => {
    let resolver: LicensesResolver;
    let service: LicensesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LicensesResolver, AuthService, { provide: LicensesService, useFactory: serviceMockFactory(licenseFixture) }]
        }).compile();

        resolver = module.get<LicensesResolver>(LicensesResolver);
        service = module.get<LicensesService>(LicensesService);
    });

    describe('createLicense', () => {
        it('should call LicensesService.create', async () => {
            await resolver.create(licenseFixture);
            expect(service.create).toHaveBeenCalledWith(licenseFixture);
        });
    });

    describe('findAll', () => {
        it('should call LicensesService.findAll', async () => {
            await resolver.findAll({ userId: 1 } as UserPayload);
            expect(service.findAll).toHaveBeenCalledWith({}, ['content'], 1);
        });
    });

    describe('findOne', () => {
        it('should call LicensesService.findOne', async () => {
            await resolver.findOne(1);
            expect(service.findOne).toHaveBeenCalledWith(1, {}, ['content'], undefined);
        });
    });

    describe('update', () => {
        it('should call LicensesService.update', async () => {
            const input: UpdateLicenseInput = { id: licenseFixture.id, expireDate: new Date() };
            await resolver.update(licenseFixture.id, input);
            expect(service.update).toHaveBeenCalledWith(licenseFixture.id, input);
        });
    });

    describe('delete', () => {
        it('should call LicensesService.delete', async () => {
            await resolver.remove(1);
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
