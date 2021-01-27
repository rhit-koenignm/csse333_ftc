import * as express from 'express';
import { Container, decorate, injectable } from 'inversify';
import { Controller } from 'tsoa';
import { RegisterRoutes } from './routes/routes';

const bootstrapTsoa = (app: express.Application, container: Container) => {
    decorate(injectable(), Controller);
    RegisterRoutes(app);
}

export const applyControllerRoutes = (app: express.Application, container: Container) => {
    bootstrapTsoa(app, container);
}