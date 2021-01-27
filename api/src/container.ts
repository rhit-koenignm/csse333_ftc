import { Container, inject, interfaces, injectable, decorate } from 'inversify';
import {
    makeProvideDecorator, makeFluentProvideDecorator
} from 'inversify-binding-decorators';
import { Controller } from 'tsoa';

import { serviceModules } from './services';

const container = new Container();

decorate(injectable(), Controller);

const Provide = makeProvideDecorator(container);
const FluentProvider = makeFluentProvideDecorator(container);

container.load(...serviceModules);

export const iocContainer = container;

export default container;

export { Provide, FluentProvider }
