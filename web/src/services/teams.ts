import Axios from 'axios';
import { Action, Reducer } from 'redux';
import { takeLatest, call, put } from 'redux-saga/effects';

export const ACTION_FETCH_ALL_TEAMS = 'teams/FETCH_ALL';
export const ACTION_FETCH_ALL_TEAMS_SUCCESS = 'teams/FETCH_ALL_SUCCESS';
export const ACTION_FETCH_ALL_TEAMS_FAILURE = 'teams/FETCH_ALL_FAILURE';

export interface Team {
    id: string;
    team_number: number;
    team_name: string;
}

export interface TeamsState {
    teams: Team[];
}

interface FetchAllTeamsAction extends Action {
    type: typeof ACTION_FETCH_ALL_TEAMS;
}
interface FetchAllTeamsSuccessAction extends Action {
    payload: {
        teams: Team[];
    };
}
interface FetchAllTeamsFailureAction extends Action {

}

export const actions = {
    fetchAllTeams: (): FetchAllTeamsAction => ({
        type: ACTION_FETCH_ALL_TEAMS,
    }),
};

const initialState: TeamsState = {
    teams: [],
}

export const reducer: Reducer<TeamsState> = (state = initialState, action): TeamsState => {
    switch(action.type) {
        case ACTION_FETCH_ALL_TEAMS_SUCCESS:
            return { ...state, teams: action.payload.teams }
        case ACTION_FETCH_ALL_TEAMS_FAILURE:
            return { ...state };
        default:
            return state;
    }
};

// TODO: make this a define
const API_BASE = `http://localhost:3001`;

interface FetchAllTeamsResponse {
    teams: Team[];
}

export class TeamsService {
    static async fetchAllTeams(): Promise<Team[]> {
        let teams = await Axios.get<{ teams: Team[] }>(`${API_BASE}/teams`);
        return teams.data.teams;
    }
}

const context = new TeamsService();

function* fetchAllTeams(action: FetchAllTeamsAction) {
    // todo: error handling
    const teams: Team[] = yield call(TeamsService.fetchAllTeams);
    yield put<FetchAllTeamsSuccessAction>({
        type: ACTION_FETCH_ALL_TEAMS_SUCCESS,
        payload: {
            teams
        },
    });
}

export function* saga() {
    yield takeLatest(ACTION_FETCH_ALL_TEAMS, fetchAllTeams);
}
