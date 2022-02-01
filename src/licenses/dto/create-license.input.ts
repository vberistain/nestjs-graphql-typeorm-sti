import { InputType, OmitType } from '@nestjs/graphql';
import { Content } from '../../content/content.entity';
import { License } from '../license.entity';

@InputType()
export class CreateLicenseInput extends OmitType(License, ['id', 'content']) {
    content: Pick<Content, 'id'>;
}
