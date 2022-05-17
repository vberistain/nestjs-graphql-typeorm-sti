import { ObjectType, Field, Int, registerEnumType, InputType } from '@nestjs/graphql';
import { License } from '../licenses/license.entity';
import { Column, Entity, OneToMany, PrimaryColumn, TableInheritance } from 'typeorm';
import { DateRange, IContent } from './content.interface';
import { ContentType } from './content.interface';

@ObjectType()
@InputType('RentablePeriodInput', { isAbstract: true })
export class RentablePeriod implements DateRange {
    @Field()
    @Column()
    start: Date;

    @Field()
    @Column()
    end: Date;
}

@ObjectType()
@InputType('AvailabilityInput', { isAbstract: true })
export class Availability extends RentablePeriod implements DateRange {}

@ObjectType({ isAbstract: true })
@InputType('ContentInput', { isAbstract: true })
@Entity()
@TableInheritance({
    column: 'type'
})
export abstract class Content implements IContent {
    @Field(() => Int)
    @PrimaryColumn()
    id!: number;

    @Field({ description: 'Content title' })
    @Column()
    title: string;

    @Field(() => ContentType, { description: 'Content type' })
    @Column({
        type: 'enum',
        enum: ContentType
    })
    type: ContentType;

    @Field(() => RentablePeriod)
    @Column(() => RentablePeriod)
    rentablePeriod: RentablePeriod;

    @Field(() => Availability)
    @Column(() => Availability)
    availability: Availability;

    @Field({ description: 'Content description' })
    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => License, (license) => license.content)
    licenses?: License[];

    @Field(() => License, { nullable: true })
    license?: License;
}

registerEnumType(ContentType, {
    name: 'ContentType'
});
