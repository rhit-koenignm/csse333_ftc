import { ContainerModule, interfaces } from "inversify";
import { databaseModule } from "./database";

export const serviceModules: ContainerModule[] = [
    databaseModule,
];
