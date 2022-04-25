import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { AfterLoad, ChildEntity, Column, OneToMany, OneToOne } from 'typeorm';
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

    @AfterLoad()
    setPlayback() {
        if (this.playbacks) {
            this.playback = this.playbacks[0];
        }
    }
}
