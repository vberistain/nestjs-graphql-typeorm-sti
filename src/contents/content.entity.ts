import { ObjectType, Field, Int, registerEnumType, InputType } from '@nestjs/graphql';
import { License } from '../licenses/license.entity';
import { Column, Entity, OneToMany, PrimaryColumn, TableInheritance } from 'typeorm';

export enum ContentType {
    movie = 'movie',
    playlist = 'playlist',
    bundle = 'bundle'
}

@ObjectType({ isAbstract: true })
@InputType('ContentInput', { isAbstract: true })
@Entity()
@TableInheritance({
    column: 'type'
})
export abstract class Content {
    @Field(() => Int)
    @PrimaryColumn()
    id!: number;

    @Field({ description: 'Content title' })
    @Column()
    title: string;

    @Field(() => ContentType, { description: 'Content type' })
    @Column({
        type: 'enum',
        enum: ContentType,
        default: ContentType.movie
    })
    readonly type: ContentType;

    @Field({ description: 'Content description' })
    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => License, (license) => license.content)
    licenses?: License[];

    @Field(() => License, { nullable: true })
    license?: License;
}

registerEnumType(ContentType, {
    name: 'ContentType'
});
