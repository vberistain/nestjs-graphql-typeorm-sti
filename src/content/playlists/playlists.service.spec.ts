import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistsService } from './playlists.service';

describe('PlaylistService', () => {
    let service: PlaylistsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlaylistsService]
        }).compile();

        service = module.get<PlaylistsService>(PlaylistsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
