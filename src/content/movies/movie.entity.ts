import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ChildEntity, Column, OneToOne } from 'typeorm';
import { Playback } from '../../playbacks/playback.entity';
import { Content, ContentType } from '../content.entity';

@InputType({ isAbstract: true })
@ObjectType('MovieObj', { isAbstract: true })
@ChildEntity({ type: ContentType.movie })
export class Movie extends Content {
    @Field(() => Int)
    @Column()
    duration: number;

    @Field(() => Playback, { nullable: true })
    @OneToOne(() => Playback)
    playback?: Playback;
}
