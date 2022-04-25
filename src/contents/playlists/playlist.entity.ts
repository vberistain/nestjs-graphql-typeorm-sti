import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { ChildEntity, JoinTable, ManyToMany } from 'typeorm';
import { Content, ContentType } from '../content.entity';
import { IPlaylist } from './playlist.interface';

//@TODO: restrict playlist contents to be only movies
@InputType('Playlistinput', { isAbstract: true })
@ObjectType()
@ChildEntity(ContentType.playlist)
export class Playlist extends Content implements IPlaylist {
    @Field(() => [Content])
    @ManyToMany(() => Content, { nullable: true })
    @JoinTable({
        name: 'content_contents',
        joinColumns: [
            {
                name: 'contextId',
                referencedColumnName: 'id'
            }
        ],
        inverseJoinColumns: [
            {
                name: 'contentId',
                referencedColumnName: 'id'
            }
        ]
    })
    contents: Content[];
}
