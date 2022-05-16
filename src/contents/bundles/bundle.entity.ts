import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ChildEntity, JoinTable, ManyToMany } from 'typeorm';
import { Content } from '../content.entity';
import { ContentType } from '../content.interface';
import { ContentContainedUnion } from '../content.types';

@ObjectType('Bundle')
@ChildEntity(ContentType.bundle)
export class Bundle extends Content {
    @Field(() => [ContentContainedUnion], { nullable: true })
    @ManyToMany('Content', 'inContents')
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
