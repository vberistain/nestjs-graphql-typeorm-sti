import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Content } from './content/content.entity';
import { Movie } from './content/movie/movie.entity';

const config: Options = {
    entities: [Content, Movie],
    entitiesTs: ['./**/*.entity.ts'],
    dbName: 'ticket-app',
    type: 'mysql',
    host: '127.0.0.1',
    user: 'root',
    metadataProvider: TsMorphMetadataProvider,
    password: 'root',
    migrations: {
        tableName: 'migrations', // migrations table name
        path: process.cwd() + '/migrations', // path to folder with migration files
        pattern: /^[\w-]+\d+\.ts$/, // how to match migration files
        transactional: true, // run each migration inside transaction
        disableForeignKeys: true, // try to disable foreign_key_checks (or equivalent)
        allOrNothing: true, // run all migrations in current batch in master transaction
        emit: 'ts', // migration generation mode,
        dropTables: true
    }
};

export default config;
