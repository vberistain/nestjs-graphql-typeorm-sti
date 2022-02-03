import { InputType, OmitType } from '@nestjs/graphql';
import { License } from '../../../licenses/license.entity';
import { Livestream } from '../livestream.entity';

@InputType()
export class CreateLivestreamInput extends OmitType(Livestream, ['license']) {
    license?: Pick<License, 'id'>;
}
