import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLResolveInfo, FieldNode } from 'graphql';
import { hasFields, fieldMapToDot, getFieldMap, resolveFieldMap } from '@jenyus-org/graphql-utils';

export function mapFromArray<T>(array: T[], keyStrategy: (v: T) => string | number) {
    const map: Record<string | number, T | undefined> = {};

    for (const item of array) {
        map[keyStrategy(item)] = item;
    }

    return map;
}

@InputType('ContentIdOnly')
export class IdOnlyEntity {
    @Field(() => Int)
    id: number;
}
