import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ChildEntity, Column, OneToMany } from 'typeorm';
import { Playback } from '../../playbacks/playback.entity';
import { Content, ContentType } from '../content.entity';

@InputType('MovieInput', { isAbstract: true })
@ObjectType('Movie')
@ChildEntity(ContentType.movie)
export class Movie extends Content {
    @Field(() => Int)
    @Column()
    duration: number;

    @OneToMany(() => Playback, (playback) => playback.content)
    playbacks?: Playback[];

    @Field(() => Playback, { nullable: true })
    playback?: Playback;
}
