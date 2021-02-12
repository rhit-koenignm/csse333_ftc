import Axios from 'axios';
import { Action, Reducer } from 'redux';
import { takeLatest, call, put } from 'redux-saga/effects';

export const ACTION_FETCH_ALL_TEAMS = 'teams/FETCH_ALL';
export const ACTION_FETCH_ALL_TEAMS_SUCCESS = 'teams/FETCH_ALL_SUCCESS';
export const ACTION_FETCH_ALL_TEAMS_FAILURE = 'teams/FETCH_ALL_FAILURE';

export const ACTION_FETCH_TEAM_RANKINGS = 'teams/FETCH_TEAM_RANKINGS';
export const ACTION_FETCH_TEAM_RANKINGS_SUCCESS = 'teams/FETCH_TEAM_RANKINGS_SUCCESS';
export const ACTION_FETCH_TEAM_RANKINGS_FAILURE = 'teams/FETCH_TEAM_RANKINGS_FAILURE';

export const ACTION_UPDATE_TEAM = 'teams/UPDATE_TEAM';
export const ACTION_UPDATE_TEAM_SUCCESS = 'teams/UPDATE_TEAM_SUCCESS';
export const ACTION_UPDATE_TEAM_FAILURE = 'teams/UPDATE_TEAM_FAILURE';

export const ACTION_SET_STATUS = 'teams/SET_STATUS';

export interface Team {
    id: string;
    team_number: number;
    team_name: string;
}

export interface TeamsState {
    teams: Team[];
    rankings: TeamRanking[];
    status: TeamsStatus;
}

export interface TeamsStatus {
    loading: boolean;
    success: boolean;
    errorMessage?: string;
}

export interface TeamRanking {
    rank_num: string;
    participant_id: string;
    team_num: number;
    qp: number;
    rp: number;
    match_count: number;
}

interface FetchAllTeamsAction extends Action {
    type: typeof ACTION_FETCH_ALL_TEAMS;
}
interface FetchAllTeamsSuccessAction extends Action {
    type: typeof ACTION_FETCH_ALL_TEAMS_SUCCESS;
    payload: {
        teams: Team[];
    };
}

interface FetchTeamRankingsAction extends Action {
    type: typeof ACTION_FETCH_TEAM_RANKINGS;
    payload: {
        tournamentId: string;
    };
}

interface FetchTeamRankingsSuccessAction extends Action {
    type: typeof ACTION_FETCH_TEAM_RANKINGS_SUCCESS;
    payload: {
        rankings: TeamRanking[];
    };
}

interface UpdateTeamAction extends Action {
    type: typeof ACTION_UPDATE_TEAM,
    payload: {
        teamId: string,
        teamToUpdate: Partial<Team>,
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
    fetchTeamRankings: (tournamentId: string): FetchTeamRankingsAction => ({
        type: ACTION_FETCH_TEAM_RANKINGS,
        payload: {
            tournamentId
        },
    }),
    updateTeam: (teamId: string, team: Partial<Team>): UpdateTeamAction => ({
        type: ACTION_UPDATE_TEAM,
        payload: {
            teamId,
            teamToUpdate: team,
        }
    }),
    setStatus: (status: Partial<TeamsStatus>) : SetStatusAction => ({
        type: ACTION_SET_STATUS,
        payload: status,
    }),
};

const initialState: TeamsState = {
    teams: [],
    rankings: [],
    status: {
        loading: false,
        success: true,
    },
}

export const reducer: Reducer<TeamsState> = (state = initialState, action): TeamsState => {
    switch(action.type) {
        case ACTION_FETCH_ALL_TEAMS_SUCCESS:
            return { ...state, teams: action.payload.teams };
        case ACTION_FETCH_ALL_TEAMS_FAILURE:
            return { ...state };
        case ACTION_FETCH_TEAM_RANKINGS_SUCCESS:
            return { ...state, rankings: action.payload.rankings };
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

interface FetchTeamRankingsResponse {
    rankings: TeamRanking[];
}

export class TeamsService {
    static async fetchAllTeams(): Promise<Team[]> {
        let teams = await Axios.get<{ teams: Team[] }>(`${API_BASE}/teams`);
        return teams.data.teams;
    }

    static async fetchTeamRankings(tournamentId: string): Promise<TeamRanking[]> {
        let rankings = await Axios.get<FetchTeamRankingsResponse>(`${API_BASE}/teams/rankings/${tournamentId}`);
        return rankings.data.rankings;
    }

    static async updateTeam(teamId: string, teamToUpdate: Partial<Team>): Promise<void> {
        await Axios.put(`${API_BASE}/teams/${teamId}`, teamToUpdate);
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

function* fetchTeamRankings(action: FetchTeamRankingsAction) {
    yield put(actions.setStatus({ loading: true }));
    const rankings: TeamRanking[] =
        yield call(() => TeamsService.fetchTeamRankings(action.payload.tournamentId));
    yield put<FetchTeamRankingsSuccessAction>({
        type: ACTION_FETCH_TEAM_RANKINGS_SUCCESS,
        payload: {
            rankings,
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

export function* saga() {
    yield takeLatest(ACTION_FETCH_ALL_TEAMS, fetchAllTeams);
    yield takeLatest(ACTION_UPDATE_TEAM, updateTeam);
    yield takeLatest(ACTION_FETCH_TEAM_RANKINGS, fetchTeamRankings);
}
