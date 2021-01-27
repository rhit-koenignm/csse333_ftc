import { Container, inject, interfaces } from 'inversify';
import {
    buildProviderModule, fluentProvide
} from 'inversify-binding-decorators';

import { serviceModules } from './services';

const container = new Container();

container.load(buildProviderModule());
container.load(...serviceModules);

export const iocContainer = container;

export default container;

export const ProvideSingleton = function<T>(
    identifier: interfaces.ServiceIdentifier<T>
) {
    return fluentProvide(identifier).inSingletonScope().done();
}

export const ProvideTransient = function<T>(
    identifier: interfaces.ServiceIdentifier<T>
) {
    return fluentProvide(identifier).inTransientScope().done();
}