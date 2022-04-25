import { Controller, Get } from '@nestjs/common';
import { Content } from './content.entity';
import { ContentsService } from './contents.service';

@Controller('contents')
export class ContentController {
    constructor(private readonly contentService: ContentsService) {}

    @Get()
    getContents(): Promise<Content[]> {
        return this.contentService.findAll();
    }
}
