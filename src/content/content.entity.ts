import { Entity, Enum, Property } from '@mikro-orm/core';
import { ObjectType, Field, Int, registerEnumType, InputType } from '@nestjs/graphql';

@ObjectType()
@InputType({ isAbstract: true })
@Entity({
    discriminatorColumn: 'type'
})
export class Content {
    @Field(() => Int)
    @Property({ primary: true })
    id!: number;

    @Field({ description: 'Content title' })
    @Property()
    title: string;

    @Field({ description: 'Content description' })
    @Property({ nullable: true })
    description?: string;

    @Field(() => ContentType, { description: 'Content type', nullable: true })
    @Enum()
    type!: ContentType;
}

export enum ContentType {
    movie = 'movie',
    playlist = 'playlist',
    bundle = 'bundle',
    livestream = 'livestream'
}

registerEnumType(ContentType, {
    name: 'ContentType'
});
