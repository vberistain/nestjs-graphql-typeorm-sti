import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { License } from '../licenses/license.entity';
import { Column, Entity, OneToOne, PrimaryColumn, TableInheritance } from 'typeorm';

export enum ContentType {
    movie = 'movie',
    playlist = 'playlist',
    bundle = 'bundle',
    livestream = 'livestream'
}

@ObjectType({ isAbstract: true })
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type', select: true, enum: ContentType } })
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

    @Field(() => License, { nullable: true })
    @OneToOne(() => License, (license) => license.content)
    license?: License;
}

registerEnumType(ContentType, {
    name: 'ContentType'
});
