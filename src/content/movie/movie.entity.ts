import { Entity, Property } from '@mikro-orm/core';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Content, ContentType } from '../content.entity';

@ObjectType()
@InputType({ isAbstract: true })
@Entity({ discriminatorValue: ContentType.movie })
export class Movie extends Content {
    @Field(() => Int)
    @Property()
    duration: number;
}
