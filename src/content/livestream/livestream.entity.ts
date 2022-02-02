import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ChildEntity, Column, OneToOne } from 'typeorm';
import { Playback } from '../../playbacks/playback.entity';
import { Content, ContentType } from '../content.entity';

@InputType({ isAbstract: true })
@ObjectType('LivestreamObj', { isAbstract: true })
@ChildEntity({ type: ContentType.livestream })
export class Livestream extends Content {
    @Field(() => Int)
    @Column()
    duration: number;

    @Field(() => Playback, { nullable: true })
    @OneToOne(() => Playback)
    playback?: Playback;
}
