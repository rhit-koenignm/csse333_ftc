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
import { Team, TeamRanking } from 'src/models/Team';

interface GetAllTeamsResponse {
    teams: Team[];
}

interface GetRankingsResponse {
    tournament_id: string;
    rankings: TeamRanking[];
}

type UpdateTeamParams = Partial<Team>;

@Route("teams")
@ProvideTransient(TeamsController)
export class TeamsController extends Controller {

    constructor(
        @inject("AppDatabase") private _db: AppDatabase
    ) {
        super();
    }


    @Get()
    public async getAllTeams(): Promise<GetAllTeamsResponse> {
        return {
            teams: await this._db.teams.findAll(),
        };
    }

    @Get("rankings/{tournId}")
    public async getTournamentRankings(@Path() tournId: string): Promise<GetRankingsResponse> {
        return {
            tournament_id: tournId,
            rankings: await this._db.teams.getTournamentRankings(tournId),
        }
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