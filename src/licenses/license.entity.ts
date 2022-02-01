import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import { Content } from '../content/content.entity';
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@InputType('LicenseInput', { isAbstract: true })
@ObjectType({ isAbstract: true })
@Entity()
export class License {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column()
    @Index()
    userId: number;

    @Field(() => Date, { nullable: true })
    @Column({ nullable: true })
    expireDate?: Date;

    @Field(() => Date, { nullable: true })
    @Column({ nullable: true })
    startDate?: Date;

    @Field(() => Content)
    @OneToOne(() => Content, (content) => content.license)
    @JoinColumn()
    content: Content;
}
