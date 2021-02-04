import Axios from 'axios';
import { Action, Reducer } from 'redux';
import { takeLatest, call, put } from 'redux-saga/effects';

export const ACTION_FETCH_ALL_TEAMS = 'teams/FETCH_ALL';
export const ACTION_FETCH_ALL_TEAMS_SUCCESS = 'teams/FETCH_ALL_SUCCESS';
export const ACTION_FETCH_ALL_TEAMS_FAILURE = 'teams/FETCH_ALL_FAILURE';

export const ACTION_UPDATE_TEAM = 'teams/UPDATE_TEAM';
export const ACTION_UPDATE_TEAM_SUCCESS = 'teams/UPDATE_TEAM_SUCCESS';
export const ACTION_UPDATE_TEAM_FAILURE = 'teams/UPDATE_TEAM_FAILURE';

export const ACTION_DELETE_TEAM = 'teams/DELETE_TEAM';
export const ACTION_DELETE_TEAM_SUCCESS = 'teams/DELETE_TEAM_SUCCESS';
export const ACTION_DELETE_TEAM_FAILURE = 'teams/DELETE_TEAM_FAILURE';

export const ACTION_SET_STATUS = 'teams/SET_STATUS';

export interface Team {
    id: string;
    team_number: number;
    team_name: string;
}

export interface TeamsState {
    teams: Team[];
    status: TeamsStatus;
}

export interface TeamsStatus {
    loading: boolean;
    success: boolean;
    errorMessage?: string;
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

interface UpdateTeamAction extends Action {
    type: typeof ACTION_UPDATE_TEAM,
    payload: {
        teamId: string,
        teamToUpdate: Partial<Team>,
    }
}

interface DeleteTeamAction extends Action {
    type: typeof ACTION_DELETE_TEAM,
    payload: {
        teamId: string,
    }
}

interface SetStatusAction extends Action {
    type: typeof ACTION_SET_STATUS,
    payload: Partial<TeamsStatus>,
}

export const actions = {
    fetchAllTeams: (): FetchAllTeamsAction => ({
        type: ACTION_FETCH_ALL_TEAMS,
    }),
    updateTeam: (teamId: string, team: Partial<Team>): UpdateTeamAction => ({
        type: ACTION_UPDATE_TEAM,
        payload: {
            teamId,
            teamToUpdate: team,
        }
    }),
    deleteTeam: (teamId: string): DeleteTeamAction => ({
        type: ACTION_DELETE_TEAM,
        payload: {
            teamId,
        }
    }),
    setStatus: (status: Partial<TeamsStatus>) : SetStatusAction => ({
        type: ACTION_SET_STATUS,
        payload: status,
    }),
};

const initialState: TeamsState = {
    teams: [],
    status: {
        loading: false,
        success: true,
    },
}

export const reducer: Reducer<TeamsState> = (state = initialState, action): TeamsState => {
    switch(action.type) {
        case ACTION_FETCH_ALL_TEAMS_SUCCESS:
            return { ...state, teams: action.payload.teams }
        case ACTION_FETCH_ALL_TEAMS_FAILURE:
            return { ...state };
        case ACTION_SET_STATUS:
            return { ...state, status: { ...state.status, ...action.payload }};
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

    static async updateTeam(teamId: string, teamToUpdate: Partial<Team>): Promise<void> {
        await Axios.put(`${API_BASE}/teams/${teamId}`, teamToUpdate);
    }

    static async deleteTeam(teamId: string): Promise<void> {
        await Axios.delete(`${API_BASE}/teams/${teamId}`);
    }
}

function* fetchAllTeams(action: FetchAllTeamsAction) {
    // todo: error handling
    yield put(actions.setStatus({ loading: true }));
    const teams: Team[] = yield call(TeamsService.fetchAllTeams);
    yield put<FetchAllTeamsSuccessAction>({
        type: ACTION_FETCH_ALL_TEAMS_SUCCESS,
        payload: {
            teams
        },
    });
    yield put(actions.setStatus({ loading: false }));
}

function* updateTeam(action: UpdateTeamAction) {
    // todo: error handling
    yield put(actions.setStatus({ loading: true }));
    yield call(() => TeamsService.updateTeam(action.payload.teamId, action.payload.teamToUpdate));
    yield put(actions.setStatus({ loading: false, success: true }));
    yield put(actions.fetchAllTeams());
}

function* deleteTeam(action: DeleteTeamAction) {
    yield put(actions.setStatus({ loading: true }));
    yield call(() => TeamsService.deleteTeam(action.payload.teamId));
    yield put(actions.setStatus({ loading: false, success: true }));
    yield put(actions.fetchAllTeams());
}

export function* saga() {
    yield takeLatest(ACTION_FETCH_ALL_TEAMS, fetchAllTeams);
    yield takeLatest(ACTION_UPDATE_TEAM, updateTeam);
    yield takeLatest(ACTION_DELETE_TEAM, deleteTeam);
}
