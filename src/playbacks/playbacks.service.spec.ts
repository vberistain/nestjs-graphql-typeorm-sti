import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { repositoryMockFactory } from '../../test/utils';
import createPlaybackInputFixture from './fixtures/create-playback.fixture';
import playbackFixture from './fixtures/playback.fixture';
import updatePlaybackInputFixture from './fixtures/update-playback.fixture';
import { Playback } from './playback.entity';
import { PlaybacksResolver } from './playbacks.resolver';
import { PlaybacksService } from './playbacks.service';

describe('PlaybacksService', () => {
    let service: PlaybacksService;
    let repository: Repository<Playback>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlaybacksResolver,
                PlaybacksService,
                {
                    provide: getRepositoryToken(Playback),
                    useFactory: repositoryMockFactory(playbackFixture)
                }
            ]
        }).compile();

        service = module.get<PlaybacksService>(PlaybacksService);
        repository = module.get<Repository<Playback>>(getRepositoryToken(Playback));
    });

    describe('create', () => {
        it('should call repository.save with the right parameters and return the result', async () => {
            const res = await service.create(createPlaybackInputFixture);
            expect(repository.save).toHaveBeenCalledWith(createPlaybackInputFixture);
            expect(res).toEqual(createPlaybackInputFixture);
        });
    });

    describe('findAll', () => {
        it('should call repository.find with the right parameters and return the result', async () => {
            const res = await service.findAll();
            expect(repository.find).toHaveBeenCalledWith();
            expect(res).toEqual([playbackFixture]);
        });
    });

    describe('findOne', () => {
        it('should call repository.findOne with the right parameters and return the result', async () => {
            const res = await service.findOne(1);
            expect(repository.findOne).toHaveBeenCalledWith(1);
            expect(res).toEqual(playbackFixture);
        });
    });

    describe('delete', () => {
        it('should call repository.delete with the right parameters', async () => {
            await service.remove(1);
            expect(repository.delete).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should call repository.update with the right parameters', async () => {
            await service.update(1, updatePlaybackInputFixture);
            expect(repository.update).toHaveBeenCalledWith(1, updatePlaybackInputFixture);
        });
    });
});
