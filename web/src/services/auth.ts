import { Action, Reducer } from "redux";
import { takeLatest, call, put } from "redux-saga/effects";

export const ACTION_AUTH_LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const ACTION_AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const ACTION_AUTH_LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const ACTION_SET_AUTH_TOKEN = 'auth/SET_TOKEN';

export interface AuthState {
    token?: string;
}

export interface LoginData {
    email: string,
    password: string,
}

interface LoginRequestAction extends Action {
    type: typeof ACTION_AUTH_LOGIN_REQUEST,
    payload: LoginData
}

interface SetAuthTokenAction extends Action {
    type: typeof ACTION_SET_AUTH_TOKEN,
    payload: { token: string }
}

export const actions = {
    login: (data: LoginData): LoginRequestAction => ({
        type: ACTION_AUTH_LOGIN_REQUEST,
        payload: data,
    }),
    setAuthToken: (token: string): SetAuthTokenAction => ({
        type: ACTION_SET_AUTH_TOKEN,
        payload: { token },
    }),
}

export const reducer: Reducer<AuthState> = (state = {}, action): AuthState => {
    switch(action.type) {
        case ACTION_SET_AUTH_TOKEN:
            return {...state, token: action.payload.token }
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
    yield put(actions.setAuthToken(token));
    return;
}

export function* saga() {
    // example: yield takeLatest(ACTION, actionHandler)
    yield takeLatest(ACTION_AUTH_LOGIN_REQUEST, login);
}
