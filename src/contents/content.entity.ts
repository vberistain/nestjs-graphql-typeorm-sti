import { ObjectType, Field, Int, registerEnumType, InputType } from '@nestjs/graphql';
import { License } from '../licenses/license.entity';
import { AfterLoad, Column, Entity, OneToMany, OneToOne, PrimaryColumn, TableInheritance } from 'typeorm';

export enum ContentType {
    movie = 'movie',
    playlist = 'playlist'
}

@ObjectType({ isAbstract: true })
@InputType('ContentInput', { isAbstract: true })
@Entity()
@TableInheritance({
    column: 'type'
})
export abstract class Content {
    @Field(() => Int)
    @PrimaryColumn()
    id!: number;

    @Field({ description: 'Content title' })
    @Column()
    title: string;

    @Field(() => ContentType, { description: 'Content type' })
    @Column({
        type: 'enum',
        enum: ContentType,
        default: ContentType.movie
    })
    readonly type: ContentType;

    @Field({ description: 'Content description' })
    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => License, (license) => license.content)
    licenses?: License[];

    @Field(() => License, { nullable: true })
    license?: License;

    @AfterLoad()
    setLicense() {
        if (this.licenses) {
            this.license = this.licenses[0];
        }
    }
}

registerEnumType(ContentType, {
    name: 'ContentType'
});
