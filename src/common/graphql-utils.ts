import { resolveFieldMap } from '@jenyus-org/graphql-utils';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

export function mapToRelations(map: Object, relations: string[] = [], prefix?: string): string[] {
    Object.keys(map).forEach((key) => {
        if (Object.keys(map[key]).length > 1) {
            relations.push(prefix ? `${prefix}.${key}` : key);
            mapToRelations(map[key], relations, key);
        }
    });
    return relations;
}

export function getRelations(info: GraphQLResolveInfo): string[] {
    const fieldMap = resolveFieldMap(info);
    const innerFieldMap = fieldMap[Object.keys(fieldMap)[0]];
    return mapToRelations(innerFieldMap);
}

export const Relations = createParamDecorator((data: unknown, context: ExecutionContext): string[] => {
    const ctx = GqlExecutionContext.create(context);
    return getRelations(ctx.getInfo());
});
