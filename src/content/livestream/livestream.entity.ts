import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
import { Content, ContentType } from '../content.entity';

@InputType({ isAbstract: true })
@ObjectType()
@ChildEntity()
export class Livestream extends Content {
    @Field(() => Int)
    @Column()
    duration: number;
    constructor() {
        super();
    }
}
