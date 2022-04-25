import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { ChildEntity, JoinTable, ManyToMany } from 'typeorm';
import { Content, ContentType } from '../content.entity';
import { ContentUnion } from '../contents.resolver';
import { IBundle } from './bundle.interface';

@InputType('Bundleinput', { isAbstract: true })
@ObjectType()
@ChildEntity(ContentType.bundle)
export class Bundle extends Content implements IBundle {
    @Field(() => [ContentUnion])
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
    contents: typeof ContentUnion[];
}
