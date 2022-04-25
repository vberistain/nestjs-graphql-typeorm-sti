import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from 'typeorm';
import { Movie } from '../contents/movies/movie.entity';
import { IPlayback } from './playback.interface';

@InputType('PlaybackInput', { isAbstract: true })
@ObjectType({ isAbstract: true })
@Entity()
@Unique(['userId', 'content'])
export class Playback implements IPlayback {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column()
    @Index()
    userId: number;

    @Field(() => Int)
    @Column({ default: 0 })
    position: number;

    @Field()
    @Column({ default: false })
    finished: boolean;

    @Field()
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

    @Field(() => Movie)
    @ManyToOne(() => Movie, (movie) => movie.playbacks, { eager: true })
    @JoinColumn()
    content: Movie;

    @AfterLoad()
    setStarted() {
        this.started = this.position > 0;
    }

    @AfterLoad()
    setFinished() {
        if (this.content) {
            this.finished = this.position < this.content.duration;
        }
    }
}
