import { Type, UseFilters, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard, GqlUserGuard } from '../../security/auth/auth.guard';
import { CustomErrorFilter } from '../errors/custom-error.filter';
import { IBaseService } from './base.service';

export function BaseResolver<Entity extends Type<unknown>, CreateEntity extends Type<unknown>, UpdateEntity extends Type<unknown>>(
    classRef: Entity,
    createClassRef: CreateEntity,
    updateClassRef: UpdateEntity
): any {
    @Resolver({ isAbstract: true })
    @UseFilters(new CustomErrorFilter())
    abstract class BaseResolverHost {
        constructor(private readonly IBaseService: IBaseService<Entity, CreateEntity, UpdateEntity>) {}

        @Query(() => [classRef], { name: `${classRef.name.toLowerCase()}s` })
        @UseGuards(GqlUserGuard)
        async findAll(): Promise<Entity[]> {
            return this.IBaseService.findAll();
        }

        @Query(() => classRef, { name: `${classRef.name.toLowerCase()}` })
        @UseGuards(GqlUserGuard)
        async findOne(@Args('id', { type: () => Int }) id: number): Promise<Entity> {
            return this.IBaseService.findOne(id, {}, []);
        }

        @Mutation(() => classRef, { name: `create${classRef.name}` })
        async create(
            @Args(`create${classRef.name}Input`, { type: () => createClassRef })
            createInput: CreateEntity
        ): Promise<Entity> {
            return this.IBaseService.create(createInput);
        }

        @Mutation(() => classRef, { name: `update${classRef.name}` })
        async update(
            @Args('id', { type: () => Int })
            id: number,
            @Args(`update${classRef.name}Input`, { type: () => updateClassRef })
            updateInput: UpdateEntity
        ): Promise<Entity> {
            return this.IBaseService.update(id, updateInput);
        }

        @Mutation(() => Boolean, { name: `remove${classRef.name}` })
        async remove(
            @Args('id', { type: () => Int })
            id: number
        ): Promise<boolean> {
            await this.IBaseService.remove(id);
            return true;
        }
    }
    return BaseResolverHost;
}
