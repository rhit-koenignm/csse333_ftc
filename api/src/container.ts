import { Container, inject, interfaces } from 'inversify';
import {
    buildProviderModule, fluentProvide
} from 'inversify-binding-decorators';

const container = new Container();

container.load(buildProviderModule());

export const iocContainer = container;

export default container;

export const ProvideSingleton = function<T>(
    identifier: interfaces.ServiceIdentifier<T>
) {
    return fluentProvide(identifier).inSingletonScope().done();
}