import { Action, Reducer } from "redux";
import { takeLatest, call } from "redux-saga/effects";

export const ACTION_AUTH_LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const ACTION_AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const ACTION_AUTH_LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export interface AuthState {

}

export interface LoginData {
    email: string,
    password: string,
}

interface LoginRequestAction extends Action {
    type: typeof ACTION_AUTH_LOGIN_REQUEST,
    payload: LoginData
}

export const actions = {
    login: (data: LoginData): LoginRequestAction => ({
        type: ACTION_AUTH_LOGIN_REQUEST,
        payload: data,
    }),
}

export const reducer: Reducer<AuthState> = (state = {}, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export class AuthService {
    static async login(data: LoginData): Promise<string> {

        return 'token123';
    }
}

function* login(action: LoginRequestAction) {
    const token = yield call(AuthService.login, action.payload);
    console.log(`Got token ${token}`);
    return;
}

export function* saga() {
    // example: yield takeLatest(ACTION, actionHandler)
    yield takeLatest(ACTION_AUTH_LOGIN_REQUEST, login);
}
