import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { ChildEntity, JoinTable, ManyToMany } from 'typeorm';
import { Content, ContentType } from '../content.entity';

@InputType('Playlistinput', { isAbstract: true })
@ObjectType()
@ChildEntity(ContentType.playlist)
export class Playlist extends Content {
    @Field(() => [Content])
    @ManyToMany(() => Content, { nullable: true })
    @JoinTable({
        name: 'content_contents',
        joinColumns: [
            {
                name: 'playlistId',
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
