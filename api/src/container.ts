import { Container, inject, interfaces, injectable, decorate } from 'inversify';
import {
    makeProvideDecorator, makeFluentProvideDecorator
} from 'inversify-binding-decorators';
import { Controller } from 'tsoa';


const container = new Container();

decorate(injectable(), Controller);

export const Provide = makeProvideDecorator(container);
export const FluentProvider = makeFluentProvideDecorator(container);

import { serviceModules } from './services';

container.load(...serviceModules);

export const iocContainer = container;

export default container;
