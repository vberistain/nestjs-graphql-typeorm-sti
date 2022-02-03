import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';
import { ChildEntity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Content } from '../content.entity';

@InputType('Playlistinput', { isAbstract: true })
@ObjectType()
@ChildEntity()
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
