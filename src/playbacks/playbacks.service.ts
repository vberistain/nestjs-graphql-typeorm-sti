import { Injectable } from '@nestjs/common';
import { CreatePlaybackInput } from './dto/create-playback.input';
import { UpdatePlaybackInput } from './dto/update-playback.input';

@Injectable()
export class PlaybacksService {
  create(createPlaybackInput: CreatePlaybackInput) {
    return 'This action adds a new playback';
  }

  findAll() {
    return `This action returns all playbacks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playback`;
  }

  update(id: number, updatePlaybackInput: UpdatePlaybackInput) {
    return `This action updates a #${id} playback`;
  }

  remove(id: number) {
    return `This action removes a #${id} playback`;
  }
}
