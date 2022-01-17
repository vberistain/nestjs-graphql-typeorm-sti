import { InputType, OmitType } from '@nestjs/graphql';
import { Livestream } from '../livestream.entity';

@InputType()
export class CreateLivestreamInput extends OmitType(Livestream, ["type"]) { }
