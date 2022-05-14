import { Field, InputType, Int, OmitType } from '@nestjs/graphql';

@InputType('CreateMovieInput')
export class CreateMovieInput {
    @Field(() => Int)
    duration: number;

    @Field(() => Int)
    id!: number;

    @Field({ description: 'Content title' })
    title: string;

    @Field({ description: 'Content title' })
    description: string;
}
