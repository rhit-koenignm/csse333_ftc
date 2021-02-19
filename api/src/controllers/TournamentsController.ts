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
import { Tournament } from 'src/models/Tournament';
import { Team } from 'src/models/Team';
import { Match } from 'src/models/Match';
import faker from 'faker';

import moment from 'moment';

interface GetAllTournamentsResponse {
    tournaments: Tournament[];
}

interface GetOneTournamentResponse {
    tournament: Tournament;
}

interface GenMatch {
    matchNum: number,
    matchTime: string,
    blueTeams: string[],
    redTeams: string[],
}

interface GenMatchesResponse {
    success: boolean,
    errorMessage?: string,
    matches?: GenMatch[],
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
    public async getTournamentTeams(@Path() tournId: string): Promise<{teams: Team[]}> {
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

    @Post('{tournId}/genMatches')
    public async generateTournamentMatches(@Path() tournId: string): Promise<GenMatchesResponse> {
        let existingMatches = await this._db.matches.findTournamentMatches(tournId);
        let teams = await this._db.teams.findTournamentTeams(tournId);

        if(teams.length <= 25) {
            return {
                success: false,
                errorMessage: "tournament doesn't exist or doesn't have enough teams",
            }
        }
        else if (existingMatches.length > 0) {
            return {
                success: false,
                errorMessage: 'tournament already has matches',
            }
        }

        let matches: GenMatch[] = [];
        let matchNum = 1;
        let matchTime = moment('8:00:00', 'HH:mm:ss');
        // generate 3 rounds of matches
        for(let i = 0; i < 3; i++) {
            let shuffledTeams = faker.helpers.shuffle(teams.map(t => t));
            while(shuffledTeams.length >= 4) {
                let redTeams = shuffledTeams.splice(0, 2);
                let blueTeams = shuffledTeams.splice(0, 2);
                matches.push({
                    matchNum: matchNum++,
                    matchTime: matchTime.format('HH:mm'),
                    blueTeams: blueTeams.map(x => x.id),
                    redTeams: redTeams.map(x => x.id),
                });
                matchTime.add(10, 'minutes');
            }
        }

        let promises: Promise<any>[] = [];
        for(let match of matches) {
            let { matchNum, matchTime, blueTeams, redTeams } = match;
            let promise = this._db.matches.createMatch(tournId, matchNum, matchTime, redTeams, blueTeams);
            promises.push(promise);
        }

        await Promise.all(promises);

        return {
            success: true,
            matches,
        };
    }

    @Delete("{tournId}/delMatches")
    public async deleteTournamentMatches(@Path() tournId: string): Promise<any> {
        return await this._db.matches.deleteTournamentMatches(tournId);
    }
}