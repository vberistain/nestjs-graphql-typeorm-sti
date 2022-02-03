import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Content } from '../contents/content.entity';
import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from 'typeorm';
import { Movie } from '../contents/movies/movie.entity';
import { Livestream } from '../contents/livestreams/livestream.entity';

@InputType('PlaybackInput', { isAbstract: true })
@ObjectType({ isAbstract: true })
@Entity()
@Unique(['userId', 'content'])
export class Playback {
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
    @OneToOne(() => Movie, (movie) => movie.playback, { eager: true })
    @OneToOne(() => Livestream, (livestream) => livestream.playback, { eager: true })
    @JoinColumn()
    content: Movie | Livestream;

    @AfterLoad()
    setStarted() {
        this.started = this.position > 0;
    }

    @AfterLoad()
    setFinished() {
        this.finished = this.position < this.content.duration;
    }
}
