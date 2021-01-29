import {
    Controller,
    Post,
    Get,
    Route,
} from 'tsoa';

import { AppDatabase } from '../services/database/database';

import { ProvideTransient } from '../decorators';
import { inject } from 'inversify'
import { Team } from 'src/models/Team';


interface GetAllTeamsResponse {
    teams: Team[];
}

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
}