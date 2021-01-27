import { combineReducers } from "redux";
import { History } from 'history';
import { connectRouter, RouterState } from "connected-react-router";
import { all } from 'redux-saga/effects';
import { reducer as authReducer, saga as authSaga, AuthState } from '../../services/auth';

export interface RootState {
    router: RouterState,
    auth: AuthState,
}

export const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
});

export function* rootSaga() {
    yield all([authSaga()]);
}