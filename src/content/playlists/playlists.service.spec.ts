import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Content } from '../content.entity';
import { Playlist } from './playlist.entity';
import { PlaylistsService } from './playlists.service';

describe('PlaylistService', () => {
    let service: PlaylistsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlaylistsService, {
                provide: getRepositoryToken(Playlist),
                useValue: {}
            }, {
                provide: getRepositoryToken(Content),
                useValue: {}
            }],

        }).compile();

        service = module.get<PlaylistsService>(PlaylistsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
