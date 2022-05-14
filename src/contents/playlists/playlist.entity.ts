import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { ChildEntity, JoinTable, ManyToMany } from 'typeorm';
import { Bundle } from '../bundles/bundle.entity';
import { Content } from '../content.entity';
import { ContentContainedUnion } from '../content.type';

@ObjectType('Playlist')
@InputType('Playlistinput', { isAbstract: true })
@ChildEntity('playlist')
export class Playlist extends Content {
    @Field(() => [ContentContainedUnion], { nullable: true })
    @ManyToMany('Movie', 'inContents')
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
    contents: typeof ContentContainedUnion[];

    @Field(() => [Bundle])
    @ManyToMany(() => Bundle, (bundle) => bundle.contents, {
        nullable: true
    })
    inContents: Bundle[];
}
