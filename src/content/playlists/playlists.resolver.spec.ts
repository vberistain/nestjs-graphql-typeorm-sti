import { Test, TestingModule } from '@nestjs/testing';
import { serviceMockFactory } from '../../../test/utils';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import playlistFixture from './fixtures/playlist.fixture';
import { PlaylistsResolver } from './playlists.resolver';
import { PlaylistsService } from './playlists.service';

describe('PlaylistsResolver', () => {
    let resolver: PlaylistsResolver;
    let service: PlaylistsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlaylistsResolver, { provide: PlaylistsService, useFactory: serviceMockFactory(playlistFixture) }]
        }).compile();

        resolver = module.get<PlaylistsResolver>(PlaylistsResolver);
        service = module.get<PlaylistsService>(PlaylistsService);
    });

    describe('createPlaylist', () => {
        it('should call PlaylistsService.create', async () => {
            await resolver.createPlaylist(playlistFixture);
            expect(service.create).toHaveBeenCalledWith(playlistFixture);
        });
    });

    describe('findPlaylists', () => {
        it('should call PlaylistsService.findAll', async () => {
            await resolver.findPlaylists();
            expect(service.findAll).toHaveBeenCalledWith();
        });
    });

    describe('findPlaylist', () => {
        it('should call PlaylistsService.findOne', async () => {
            await resolver.findPlaylist(1);
            expect(service.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should call PlaylistsService.update', async () => {
            const input: UpdatePlaylistInput = { id: playlistFixture.id, title: 'Another title' };
            const res = await resolver.updatePlaylist(input);
            expect(service.update).toHaveBeenCalledWith(playlistFixture.id, input);
        });
    });

    describe('delete', () => {
        it('should call PlaylistsService.delete', async () => {
            await resolver.removePlaylist(1);
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
