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
import { Team } from 'src/models/Team';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import { ParameterizedQuery } from 'pg-promise';


interface GetAllTeamsResponse {
    teams: Team[];
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

    @Put("{teamId}")
    public async updateTeam(
        @Path() teamId: string,
        @Body() body: any,
    ): Promise<number> {
        console.log(teamId);
        let result = await this._db.teams.update(teamId, body);
        console.log(result);
        return result;
    }
}