import { Test, TestingModule } from '@nestjs/testing';
import { serviceMockFactory } from '@test/utils';
import { AuthService } from '../security/auth/auth.service';
import { UpdatePlaybackInput } from './dto/update-playback.input';
import playbackFixture from './fixtures/playback.fixture';
import { PlaybacksResolver } from './playbacks.resolver';
import { PlaybacksService } from './playbacks.service';

describe('PlaybacksResolver', () => {
    let resolver: PlaybacksResolver;
    let service: PlaybacksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlaybacksResolver, AuthService, { provide: PlaybacksService, useFactory: serviceMockFactory(playbackFixture) }]
        }).compile();

        resolver = module.get<PlaybacksResolver>(PlaybacksResolver);
        service = module.get<PlaybacksService>(PlaybacksService);
    });

    describe('createPlayback', () => {
        it('should call PlaybacksService.create', async () => {
            await resolver.create(playbackFixture);
            expect(service.create).toHaveBeenCalledWith(playbackFixture);
        });
    });

    describe('findPlaybacks', () => {
        it('should call PlaybacksService.findAll', async () => {
            await resolver.findAll();
            expect(service.findAll).toHaveBeenCalledWith();
        });
    });

    describe('findPlayback', () => {
        it('should call PlaybacksService.findOne', async () => {
            await resolver.findOne(1);
            expect(service.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should call PlaybacksService.update', async () => {
            const input: UpdatePlaybackInput = { duration: 123 };
            await resolver.update(1, input);
            expect(service.update).toHaveBeenCalledWith(playbackFixture.id, input);
        });
    });

    describe('delete', () => {
        it('should call PlaybacksService.delete', async () => {
            await resolver.remove(1);
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
