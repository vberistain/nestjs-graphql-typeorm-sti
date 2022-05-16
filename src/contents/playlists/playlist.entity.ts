import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { ChildEntity, JoinTable, ManyToMany } from 'typeorm';
import { Bundle } from '../bundles/bundle.entity';
import { Content } from '../content.entity';
import { ContentType } from '../content.interface';
import { ContentContainedUnion } from '../content.types';
import { Movie } from '../movies/movie.entity';

@ObjectType('Playlist')
@InputType('Playlistinput', { isAbstract: true })
@ChildEntity(ContentType.playlist)
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
    contents: Movie[];

    @Field(() => [Bundle])
    @ManyToMany(() => Bundle, (bundle) => bundle.contents, {
        nullable: true
    })
    inContents: Bundle[];
}
