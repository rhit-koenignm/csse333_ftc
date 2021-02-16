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
import { Tournament } from 'src/models/Tournament';

interface GetAllTournamentsResponse {
    tournaments: Tournament[];
}

@Route("tournaments")
@ProvideTransient(TournamentsController)
export class TournamentsController extends Controller {

    constructor(
        @inject("AppDatabase") private _db: AppDatabase
    ) {
        super();
    }


    @Get()
    public async getAllTeams(): Promise<GetAllTournamentsResponse> {
        return {
            tournaments: await this._db.tournaments.findAll(),
        };
    }

}