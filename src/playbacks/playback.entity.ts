import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Content } from '../content/content.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@InputType('PlaybackInput', { isAbstract: true })
@ObjectType({ isAbstract: true })
@Entity()
export class Playback {
    @Field(() => Int)
    @PrimaryColumn()
    id: number;

    @Field(() => Int)
    @Column()
    userId: number;

    @Field(() => Int)
    @Column({ default: 0 })
    position: number;

    @Field()
    @Column({ default: false })
    finished: boolean;

    @Field()
    @Column({ default: false })
    started: boolean;

    @Field(() => Int)
    @Column({ default: 0 })
    duration: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => Content)
    @OneToOne(() => Content, (content) => content.playback)
    @JoinColumn()
    content: Content;
}
