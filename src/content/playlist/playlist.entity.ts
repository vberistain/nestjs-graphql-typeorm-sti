import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
import { Content, ContentType } from '../content.entity';

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
@ChildEntity({ type: ContentType.playlist })
export class Playlist extends Content {
    @Field()
    @Column()
    anotherProp: string;
    // @OneToMany(() => Content, (content) => content.id, { nullable: true })
    // contents?: Content[];

    constructor() {
        super();
    }
}
