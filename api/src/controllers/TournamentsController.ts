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
import { Team } from 'src/models/Team';

interface GetAllTournamentsResponse {
    tournaments: Tournament[];
}

interface GetOneTournamentResponse {
    tournament: Tournament;
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
    public async getAllTournaments(): Promise<GetAllTournamentsResponse> {
        return {
            tournaments: await this._db.tournaments.findAll(),
        };
    }

    @Get('{tournId}/teams')
    public async getTounamentTeams(@Path() tournId: string): Promise<{teams: Team[]}> {
        return {
            teams: await this._db.teams.findTournamentTeams(tournId),
        }
    }

    @Get('{tournId}')
    public async getTournament(@Path() tournId: string): Promise<GetOneTournamentResponse> {
        return {
            tournament: await this._db.tournaments.findOne(tournId),
        }
    }

}