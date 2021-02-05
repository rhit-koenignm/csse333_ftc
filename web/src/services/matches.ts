import Axios from 'axios';
import { Action, Reducer } from 'redux';
import { takeLatest, call, put } from 'redux-saga/effects';

export const ACTION_FETCH_ALL_MATCHES = 'matches/FETCH_ALL';
export const ACTION_FETCH_ALL_MATCHES_SUCCESS = 'matches/FETCH_ALL_SUCCESS';
export const ACTION_FETCH_ALL_MATCHES_FAILURE = 'matches/FETCH_ALL_FAILURE';

export const ACTION_FETCH_ONE_MATCH = 'matches/FETCH_ONE';
export const ACTION_FETCH_ONE_MATCH_SUCCESS = 'matches/FETCH_ONE_SUCCESS';
export const ACTION_FETCH_ONE_MATCH_FAILURE = 'matches/FETCH_ONE_FAILURE';

/*
export const ACTION_UPDATE_TEAM = 'teams/UPDATE_TEAM';
export const ACTION_UPDATE_TEAM_SUCCESS = 'teams/UPDATE_TEAM_SUCCESS';
export const ACTION_UPDATE_TEAM_FAILURE = 'teams/UPDATE_TEAM_FAILURE';
export const ACTION_SET_STATUS = 'teams/SET_STATUS';
*/

export interface MatchTeam {
    team_id: string,
    team_number: string,
    team_name: string,
    alliance_color: 'Red' | 'Blue',
    attending: boolean,
}

export interface Match {
    id: string,
    number: number,
    tournament_id: string,
    red_score: number,
    blue_score: number,
    scheduled_time: string,
    teams: string[] | MatchTeam[],
}

export interface MatchesState {
    matches: Match[];
}

interface FetchAllMatchesAction extends Action {
    type: typeof ACTION_FETCH_ALL_MATCHES;
}
interface FetchAllMatchesSuccessAction extends Action {
    type: typeof ACTION_FETCH_ALL_MATCHES_SUCCESS,
    payload: {
        matches: Match[];
    };
}

interface FetchOneMatchAction extends Action {
    type: typeof ACTION_FETCH_ONE_MATCH,
    payload: {
        matchId: string,
    };
}

interface FetchOneMatchSuccessAction extends Action {
    type: typeof ACTION_FETCH_ONE_MATCH_SUCCESS,
    payload: {
        match: Match,
    };
}

interface FetchAllMatchesFailureAction extends Action {

}

/*
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
*/

export const actions = {
    fetchAllMatches: (): FetchAllMatchesAction => ({
        type: ACTION_FETCH_ALL_MATCHES,
    }),
    fetchOneMatch: (id: string): FetchOneMatchAction => ({
        type: ACTION_FETCH_ONE_MATCH,
        payload: {
            matchId: id,
        },
    })
    /*
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
    */
};

const initialState: MatchesState = {
    matches: [],
}

export const reducer: Reducer<MatchesState> = (state = initialState, action): MatchesState => {
    switch(action.type) {
        case ACTION_FETCH_ALL_MATCHES_SUCCESS:
            return { ...state, matches: action.payload.matches };
        case ACTION_FETCH_ONE_MATCH_SUCCESS:
            // remove the old match
            let matches = state.matches.filter(match => match.id != action.payload.match.id);
            matches.push(action.payload.match);
            return { ...state, matches };
        case ACTION_FETCH_ALL_MATCHES_FAILURE:
            return { ...state };
        default:
            return state;
    }
};

// TODO: make this a define
const API_BASE = `http://localhost:3001`;

interface FetchAllMatchesResponse {
    matches: Match[];
}

interface FetchOneMatchResponse {
    match: Match;
}

export class MatchesService {
    static async fetchAllMatches(): Promise<Match[]> {
        let matches = await Axios.get<FetchAllMatchesResponse>(`${API_BASE}/teams`);
        return matches.data.matches;
    }

    static async fetchOneMatch(matchId: string): Promise<Match> {
        let match = await Axios.get<FetchOneMatchResponse>(`${API_BASE}/matches/${matchId}`);
        return match.data.match;
    }
}

function* fetchAllMatches(action: FetchAllMatchesAction) {
    // todo: error handling
    // yield put(actions.setStatus({ loading: true }));
    const matches: Match[] = yield call(MatchesService.fetchAllMatches);
    yield put<FetchAllMatchesSuccessAction>({
        type: ACTION_FETCH_ALL_MATCHES_SUCCESS,
        payload: {
            matches,
        },
    });
    // yield put(actions.setStatus({ loading: false }));
}

function* fetchOneMatch(action: FetchOneMatchAction) {
    const match: Match = yield call(() => MatchesService.fetchOneMatch(action.payload.matchId));
    yield put<FetchOneMatchSuccessAction>({
        type: ACTION_FETCH_ONE_MATCH_SUCCESS,
        payload: {
            match,
        },
    });
}


export function* saga() {
    yield takeLatest(ACTION_FETCH_ALL_MATCHES, fetchAllMatches);
    yield takeLatest(ACTION_FETCH_ONE_MATCH, fetchOneMatch);
}
