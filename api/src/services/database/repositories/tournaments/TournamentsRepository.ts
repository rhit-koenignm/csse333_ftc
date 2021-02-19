import { AppDatabase } from '../../database';
import { sql } from '../../util';
import { Tournament } from '../../../../models/Tournament';

const findAllQuery = sql('tournaments/findAll.sql');
const findOneQuery = sql('tournaments/findOne.sql');
const createTournamentQuery = sql('tournaments/createTournament.sql');
const registerTeamQuery = sql('tournaments/registerTeam.sql');

export class TournamentsRepository {
    constructor(private _db: AppDatabase) {}

    public async findAll() : Promise<Tournament[]> {
        return this._db.any(findAllQuery);
    }

    public async findOne(tournId: string): Promise<Tournament> {
        return this._db.one(findOneQuery, { tournId });
    }

    public async createTournament(name: string, date: string, location: string): Promise<string> {
        let result = await this._db.one<{create_tournament: string}>(createTournamentQuery, { name, date, location});
        return result.create_tournament;
    }

    public async registerTeam(teamId: string, tournId: string): Promise<number> {
        let result = await this._db.one<any>(registerTeamQuery, {
            teamId,
            tournId,
        });
        return result.register_team_for_tournament;
    }
}