import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
import { Content } from '../content.entity';

@ObjectType()
@InputType({ isAbstract: true })
@ChildEntity()
export class Movie extends Content {
    @Field(() => Int)
    @Column()
    duration: number;
}
