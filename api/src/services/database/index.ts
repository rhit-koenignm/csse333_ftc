import { ContainerModule, interfaces } from "inversify";
import { Pool } from 'pg';

export const databaseModule = new ContainerModule((
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {

});