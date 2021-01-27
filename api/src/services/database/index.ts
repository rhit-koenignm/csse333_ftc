import { ContainerModule, interfaces, decorate, injectable } from 'inversify';
import { Pool } from 'pg';

export const databaseModule = new ContainerModule((
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    // Construct our database instance
    decorate(injectable(), Pool);
    const pool = new Pool({
        user: process.env.PGUSER || 'dbuser',
        host: process.env.PGHOST ||'database.server.com',
        database: process.env.PGDATABASE || 'mydb',
        password: process.env.PGPASSWORD || 'secretpassword',
        port: Number(process.env.PGPORT) || 5432,
    });

    bind<Pool>(Pool).toConstantValue(pool);
});