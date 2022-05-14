import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ChildEntity, JoinTable, ManyToMany } from 'typeorm';
import { Content } from '../content.entity';
import { ContentContainedUnion } from '../content.type';

@ObjectType('Bundle', { isAbstract: true })
@InputType('BundleInput', { isAbstract: true })
@ChildEntity('bundle')
export class Bundle extends Content {
    @Field(() => [ContentContainedUnion], { nullable: true })
    @ManyToMany('Content', 'inContents')
    // @ManyToMany('Movie', 'inContents')
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
    contents?: typeof ContentContainedUnion[];
}
