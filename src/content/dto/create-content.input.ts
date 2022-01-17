import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContentInput {
    @Field(() => String, { description: 'Example field (placeholder)' })
    exampleField: string;
}
