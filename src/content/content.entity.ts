import { ObjectType, Field, Int, registerEnumType, InputType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, TableInheritance } from 'typeorm';

export enum ContentType {
    movie = 'movie',
    playlist = 'playlist',
    bundle = 'bundle',
    livestream = 'livestream'
}

@ObjectType()
@InputType({ isAbstract: true })
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'ctype', select: false } })
export abstract class Content {
    @Field(() => Int)
    @PrimaryColumn()
    id!: number;

    @Field({ description: 'Content title' })
    @Column()
    title: string;

    @Field({ description: 'Content description' })
    @Column({ nullable: true })
    description?: string;

    @Field(() => ContentType, { description: 'Content type' })
    @Column({ type: 'enum', enum: ContentType })
    type: ContentType;
}

registerEnumType(ContentType, {
    name: 'ContentType'
});
