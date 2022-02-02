import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateLivestreamInput } from './create-livestream.input';

@InputType()
export class UpdateLivestreamInput extends PartialType(CreateLivestreamInput) {}
