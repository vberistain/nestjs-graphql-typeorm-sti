import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Content } from '../../content/content.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class License {
    @Field(() => ID)
    @PrimaryColumn()
    id: number;

    @Field(() => Date, { nullable: true })
    @Column({ nullable: true })
    expireDate?: Date;

    @Field(() => Date, { nullable: true })
    @Column({ nullable: true })
    startDate?: Date;

    @Field(() => Content)
    @OneToOne(() => Content)
    content: Content
}
