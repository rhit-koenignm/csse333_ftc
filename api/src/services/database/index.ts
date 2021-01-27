import { ContainerModule, interfaces, decorate, injectable } from 'inversify';
import * as pgPromise from 'pg-promise';
import { AppDatabase, db } from './database';

export const databaseModule = new ContainerModule((
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    bind<AppDatabase>("AppDatabase").toConstantValue(db);
});
