import {
    Controller,
    Post,
    Get,
    Put,
    Route,
    Path,
    Body,
    Delete,
} from 'tsoa';

import { AppDatabase } from '../services/database/database';

import { ProvideTransient } from '../decorators';
import { inject } from 'inversify'
import { Team } from '../models/Team';
import { Match, UpcomingMatch } from '../models/Match';

interface GetAllMatchesResponse {
    matches: Match[];
}

interface GetMatchResponse {
    match: Match,
}

interface GetUpcomingMatchesResponse {
    tournament_id: string;
    matches: UpcomingMatch[];
}

type UpdateTeamParams = Partial<Team>;

interface SaveMatchRequest {
    matchId: string,
    redScore: number,
    blueScore: number,
    attendance: { team_id: string, attendance: boolean }[],
}

@Route("matches")
@ProvideTransient(MatchesController)
export class MatchesController extends Controller {

    constructor(
        @inject("AppDatabase") private _db: AppDatabase
    ) {
        super();
    }


    @Get()
    public async getAllMatches(): Promise<GetAllMatchesResponse> {
        return {
            matches: await this._db.matches.findAll(),
        };
    }

    @Get("{matchId}")
    public async getMatch(@Path() matchId: string): Promise<GetMatchResponse> {
        return {
            match: await this._db.matches.findOne(matchId),
        };
    }

    @Get("upcoming/{tournId}")
    public async getUpcomingMatches(@Path() tournId: string): Promise<GetUpcomingMatchesResponse> {
        return {
            tournament_id: tournId,
            matches: await this._db.matches.findUpcomingMatches(tournId),
        };
    }

    @Get("tournament/{tournId}")
    public async getMatches(@Path() tournId: string): Promise<GetAllMatchesResponse> {
        return {
            matches: await this._db.matches.findTournamentMatches(tournId),
        };
    }

    @Put("{matchId}")
    public async updateMatchDetails(
        @Path() matchId: string,
        @Body() body: SaveMatchRequest,
    ): Promise<{ status: number }> {
        let result = await this._db.matches.updateDetails(
            matchId,
            body.redScore,
            body.blueScore,
            body.attendance,
        );
        return { status: 0 };
    }
}