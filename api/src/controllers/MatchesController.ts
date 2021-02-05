import {
    Controller,
    Post,
    Get,
    Put,
    Route,
    Path,
    Body,
} from 'tsoa';

import { AppDatabase } from '../services/database/database';

import { ProvideTransient } from '../decorators';
import { inject } from 'inversify'
import { Team } from '../models/Team';
import { Match } from '../models/Match';

interface GetAllMatchesResponse {
    matches: Match[];
}

interface GetMatchResponse {
    match: Match,
}

type UpdateTeamParams = Partial<Team>;

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

    @Put("{teamId}")
    public async updateTeam(
        @Path() teamId: string,
        @Body() body: any,
    ): Promise<{ status: number }> {
        let result = await this._db.teams.update(teamId, body);
        return { status: result };
    }
}