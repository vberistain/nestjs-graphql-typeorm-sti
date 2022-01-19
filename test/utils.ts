import { Repository } from 'typeorm';

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};

export function repositoryMockFactory(fixture): () => MockType<Partial<Repository<any>>> {
    return jest.fn(() => ({
        findOne: jest.fn(async (id: any) => fixture),
        find: jest.fn(async () => [fixture]),
        save: jest.fn(async (entity: any) => entity),
        delete: jest.fn(async (id: any) => ({ raw: {} }))
    }));
}

export function serviceMockFactory(fixture: any) {
    return jest.fn(() => ({
        findOne: jest.fn(async (id: number) => fixture),
        findAll: jest.fn(async () => [fixture]),
        update: jest.fn(async (id: number, updateData: any) => fixture),
        create: jest.fn(async (entity: any) => entity),
        remove: jest.fn(async (id: number) => {})
    }));
}
