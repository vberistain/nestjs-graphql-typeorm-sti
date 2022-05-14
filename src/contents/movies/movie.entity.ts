import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ChildEntity, Column, ManyToMany, OneToMany } from 'typeorm';
import { Playback } from '../../playbacks/playback.entity';
import { Bundle } from '../bundles/bundle.entity';
import { Content } from '../content.entity';
import { ContentContainerUnion } from '../content.type';
import { Playlist } from '../playlists/playlist.entity';

@ObjectType('Movie')
@ChildEntity('movie')
export class Movie extends Content {
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
