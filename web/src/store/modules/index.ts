import { combineReducers } from "redux";
import { History } from 'history';
import { connectRouter, RouterState } from "connected-react-router";
import { all } from 'redux-saga/effects';
import { reducer as authReducer, saga as authSaga, AuthState } from '../../services/auth';
import { reducer as teamsReducer, saga as teamsSaga, TeamsState } from '../../services/teams';
import { reducer as matchesReducer, saga as matchesSaga, MatchesState } from '../../services/matches';
import { reducer as tournamentsReducer, saga as tournamentsSaga, TournamentsState } from '../../services/tournaments';
export interface RootState {
    router: RouterState,
    auth: AuthState,
    teams: TeamsState,
    matches: MatchesState,
    tournaments: TournamentsState,
}

export const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    teams: teamsReducer,
    matches: matchesReducer,
    tournaments: tournamentsReducer,
});

export function* rootSaga() {
    yield all([
        authSaga(),
        teamsSaga(),
        matchesSaga(),
        tournamentsSaga(),
    ]);
}