;
import { default as pgPromise } from 'pg-promise';
import { IInitOptions, IDatabase, IMain, IQueryFileOptions, QueryFile } from 'pg-promise';
import { UsersRepository } from './repositories/user/UsersRepository';
import { TeamsRepository } from './repositories/teams/TeamsRepository';
import { MatchesRepository } from './repositories/matches/MatchesRepository';

export type AppDatabase = IDatabase<DatabaseExtensions> & DatabaseExtensions;

// Define repositories here
interface DatabaseExtensions {
    users: UsersRepository,
    teams: TeamsRepository,
    matches: MatchesRepository,
}

const initOptions: IInitOptions<DatabaseExtensions> = {
    extend: (db: AppDatabase, dc: any) => {
        // Add repositories here
        // Example: https://github.com/vitaly-t/pg-promise-demo/blob/master/TypeScript/db/index.ts
        db.users = new UsersRepository(db);
        db.teams = new TeamsRepository(db);
        db.matches = new MatchesRepository(db);
    }
};

const pgp: IMain<DatabaseExtensions> = pgPromise(initOptions);

// Create the database with extensions
export const db: AppDatabase = pgp({
    host: process.env.PGHOST || '137.112.104.155',
    port: Number(process.env.PGPORT) || 5432,
    database: process.env.PGDATABASE || 'csse333_ftc',
    user: process.env.PGUSER || 'csse333_ftc',
    password: process.env.PGPASSWORD || 'secretpassword',
});


