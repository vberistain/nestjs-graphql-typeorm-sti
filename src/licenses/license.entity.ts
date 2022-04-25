import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import { Content } from '../contents/content.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@InputType('LicenseInput', { isAbstract: true })
@ObjectType()
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
    @Column({ nullable: true, default: () => 'NOW()' })
    startDate?: Date;

    @Field(() => Content)
    @ManyToOne(() => Content, (content) => content.licenses)
    @JoinColumn()
    content: Content;
}
