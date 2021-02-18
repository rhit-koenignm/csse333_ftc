import Axios from 'axios';
import { Action, Reducer } from 'redux';
import { takeLatest, call, put } from 'redux-saga/effects';
import { FetchAllMatchesResponse, Match } from './matches';

export const ACTION_FETCH_ALL_TOURNAMENTS = 'tournaments/FETCH_ALL';
export const ACTION_FETCH_ALL_TOURNAMENTS_SUCCESS = 'tournaments/FETCH_ALL_SUCCESS';
export const ACTION_FETCH_ALL_TOURNAMENTS_FAILURE = 'tournaments/FETCH_ALL_FAILURE';

export const ACTION_FETCH_ONE_TOURNAMENT = 'tournaments/FETCH_ONE';
export const ACTION_FETCH_ONE_TOURNAMENT_SUCCESS = 'tournaments/FETCH_ONE_SUCCESS';
export const ACTION_FETCH_ONE_TOURNAMENT_FAILURE = 'tournaments/FETCH_ONE_FAILURE';

export const ACTION_UPDATE_CURRENT_TOURNAMENT = 'tournaments/UPDATE_CURRENT';

export interface MatchTeam {
    team_id: string,
    team_number: string,
    team_name: string,
    alliance_color: 'Red' | 'Blue',
    attending: boolean,
}

export interface Tournament {
    id: string;
    name: string;
    date: string;
    location: string;
}

export interface TournamentsState {
    tournaments: Tournament[];
    currentTournamentId?: string;
}

interface FetchAllTournamentsAction extends Action {
    type: typeof ACTION_FETCH_ALL_TOURNAMENTS;
}
interface FetchAllTournamentsSuccessAction extends Action {
    type: typeof ACTION_FETCH_ALL_TOURNAMENTS_SUCCESS,
    payload: {
        tournaments: Tournament[];
    };
}

interface FetchTournamentAction extends Action {
    type: typeof ACTION_FETCH_ONE_TOURNAMENT;
    payload: {
        tournamentId: string;
    };
}

interface FetchTournamentSuccessAction extends Action {
    type: typeof ACTION_FETCH_ONE_TOURNAMENT_SUCCESS;
    payload: {
        tournament: Tournament;
    }
}

interface UpdateSelectedTournamentAction extends Action {
    type: typeof ACTION_UPDATE_CURRENT_TOURNAMENT,
    payload: {
        tournamentId: string,
    };
}

export const actions = {
    fetchAllTournaments: (): FetchAllTournamentsAction => ({
        type: ACTION_FETCH_ALL_TOURNAMENTS,
    }),
    fetchTournament: (tournId: string): FetchTournamentAction => ({
        type: ACTION_FETCH_ONE_TOURNAMENT,
        payload: {
            tournamentId: tournId,
        },
    }),
    setCurrentTournament: (tournamentId: string): UpdateSelectedTournamentAction => ({
        type: ACTION_UPDATE_CURRENT_TOURNAMENT,
        payload: {
            tournamentId
        }
    }),
};

const initialState: TournamentsState = {
    tournaments: [],
    currentTournamentId: sessionStorage.getItem('currentTournamentId') || undefined,
}

export const reducer: Reducer<TournamentsState> = (state = initialState, action): TournamentsState => {
    switch(action.type) {
        case ACTION_FETCH_ALL_TOURNAMENTS_SUCCESS:
            return { ...state, tournaments: action.payload.tournaments };
        case ACTION_UPDATE_CURRENT_TOURNAMENT:
            let tournamentId = action.payload.tournamentId;
            sessionStorage.setItem('currentTournamentId', tournamentId);
            return { ...state, currentTournamentId: tournamentId };
        default:
            return state;
    }
};

// TODO: make this a define
const API_BASE = `http://localhost:3001`;

interface FetchAllTournamentsResponse {
    tournaments: Tournament[];
}

interface GetOneTournamentResponse {
    tournament: Tournament;
}

export class TournamentsService {
    static async fetchAllTournaments(): Promise<Tournament[]> {
        let matches = await Axios.get<FetchAllTournamentsResponse>(`${API_BASE}/tournaments`);
        return matches.data.tournaments;
    }

    static async fetchTournament(tournId: string): Promise<Tournament> {
        let tournament = await Axios.get<GetOneTournamentResponse>(`${API_BASE}/tournaments/${tournId}`)
        return tournament.data.tournament;
    }

    static async fetchTournamentMatches(tournId: string): Promise<Match[]> {
        let matches = await Axios.get<FetchAllMatchesResponse>(`${API_BASE}/matches/tournament/${tournId}`);
        return matches.data.matches;
    }

    static getSelectedTournament(): string | null {
        return sessionStorage.getItem('currentTournamentId');
    }
}

function* fetchAllTournaments(action: FetchAllTournamentsAction) {
    // todo: error handling
    // yield put(actions.setStatus({ loading: true }));
    const tournaments: Tournament[] = yield call(TournamentsService.fetchAllTournaments);
    yield put<FetchAllTournamentsSuccessAction>({
        type: ACTION_FETCH_ALL_TOURNAMENTS_SUCCESS,
        payload: {
            tournaments,
        },
    });
    // yield put(actions.setStatus({ loading: false }));
}

export function* saga() {
    yield takeLatest(ACTION_FETCH_ALL_TOURNAMENTS, fetchAllTournaments);
}
