import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, createRootReducer, rootSaga } from './modules';
import { createBrowserHistory } from 'history';

import createSagaMiddleware from 'redux-saga';

export const history = createBrowserHistory();

export const configureStore = function(initialState?: RootState): Store<RootState> {
    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();
    const middlewareEnhancer = applyMiddleware(sagaMiddleware);
    const composedEnhancers = composeEnhancers(middlewareEnhancer);
    const rootReducer = createRootReducer(history);
    const store = createStore(rootReducer, initialState, composedEnhancers) as Store<RootState>;

    sagaMiddleware.run(rootSaga);

    return store;
}