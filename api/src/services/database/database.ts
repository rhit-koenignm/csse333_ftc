import { default as pgPromise } from 'pg-promise';
import { IInitOptions, IDatabase, IMain } from 'pg-promise';

export type AppDatabase = IDatabase<DatabaseExtensions> & DatabaseExtensions;

// Define repositories here
interface DatabaseExtensions {

}

const initOptions: IInitOptions<DatabaseExtensions> = {
    extend: (db: AppDatabase, dc: any) => {
        // Add repositories here
        // Example: https://github.com/vitaly-t/pg-promise-demo/blob/master/TypeScript/db/index.ts
    }
};

const pgp: IMain<DatabaseExtensions> = pgPromise(initOptions);

// Create the database with extensions
export const db: AppDatabase = pgp({
    host: process.env.PGHOST || 'database.server.com',
    port: Number(process.env.PGPORT) || 5432,
    database: process.env.PGDATABASE || 'mydb',
    password: process.env.PGPASSWORD || 'secretpassword',
});
