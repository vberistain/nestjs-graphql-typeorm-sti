import { ObjectType, Field, Int, registerEnumType, InputType } from '@nestjs/graphql';
import { License } from '../licenses/license.entity';
import { Column, Entity, OneToOne, PrimaryColumn, TableInheritance } from 'typeorm';
import { Playback } from '../playbacks/playback.entity';

export enum ContentType {
    movie = 'movie',
    playlist = 'playlist',
    bundle = 'bundle',
    livestream = 'livestream'
}

@ObjectType({ isAbstract: true })
@InputType('ContentInput', { isAbstract: true })
@Entity()
@TableInheritance({ column: { type: 'varchar', name: '_ctype', select: false } })
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
    @Column()
    type: ContentType;

    @Field(() => License, { nullable: true })
    @OneToOne(() => License, (license) => license.content)
    license?: License;

    @Field(() => Playback, { nullable: true })
    @OneToOne(() => Playback)
    playback?: Playback;
}

registerEnumType(ContentType, {
    name: 'ContentType'
});
