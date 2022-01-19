import { Test, TestingModule } from '@nestjs/testing';
import { PlaybacksService } from './playbacks.service';

describe('PlaybacksService', () => {
  let service: PlaybacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaybacksService],
    }).compile();

    service = module.get<PlaybacksService>(PlaybacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
