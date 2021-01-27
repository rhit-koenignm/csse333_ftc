import { inject, interfaces } from "inversify";
import { Provide, FluentProvider } from './container';


export const ProvideSingleton = function<T>(
    identifier: interfaces.ServiceIdentifier<T>
) {
    return FluentProvider(identifier).inSingletonScope().done();
}

export const ProvideTransient = function<T>(
    identifier: interfaces.ServiceIdentifier<T>
) {
    return FluentProvider(identifier).inTransientScope().done();
}

export const Inject = inject;