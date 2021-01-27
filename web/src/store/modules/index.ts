import { combineReducers } from "redux";
import { History } from 'history';
import { connectRouter } from "connected-react-router";
import { all } from 'redux-saga/effects';
import { reducer as authReducer, saga as authSaga } from 'app/services/auth';

export interface RootState {

}

export const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    user: authReducer,
});

export function* rootSaga() {
    yield all([authSaga()]);
}