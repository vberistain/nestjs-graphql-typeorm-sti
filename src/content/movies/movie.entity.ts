import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
import { Content, ContentType } from '../content.entity';

@InputType({ isAbstract: true })
@ObjectType("Movie", { isAbstract: true })
@ChildEntity({ type: ContentType.movie })
export class Movie extends Content {
    @Field(() => Int)
    @Column()
    duration: number;
}
