import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ChildEntity, Column, ManyToMany, OneToMany } from 'typeorm';
import { Playback } from '../../playbacks/playback.entity';
import { Bundle } from '../bundles/bundle.entity';
import { Content } from '../content.entity';
import { ContentContainerUnion } from '../content.types';
import { Playlist } from '../playlists/playlist.entity';
import { IMovie } from './movie.interface';

@ObjectType('Movie')
@InputType('MovieInput', { isAbstract: true })
@ChildEntity('movie')
export class Movie extends Content implements IMovie {
    @Field(() => Int)
    @Column()
    duration: number;

    @OneToMany(() => Playback, (playback) => playback.content)
    playbacks?: Playback[];

    @Field(() => Playback, { nullable: true })
    playback?: Playback;

    @Field(() => [ContentContainerUnion])
    @ManyToMany(() => Bundle || Playlist, (content) => content.contents, {
        nullable: true
    })
    inContents: typeof ContentContainerUnion[];
}
