import { AppDatabase } from '../../database';
import { sql } from '../../util';
import { Match, MatchTeam } from '../../../../models/Match';

const findAllQuery = sql('matches/findAll.sql');
const findOne = sql('matches/findOne.sql');
const findMatchTeams = sql('matches/findMatchTeams.sql');
const updateQuery = sql('matches/update.sql');

export class MatchesRepository {
    constructor(private _db: AppDatabase) {}

    public async findAll() : Promise<Match[]> {
        return this._db.any(findAllQuery);
    }

    public async findOne(id: string): Promise<Match> {
        let matchInfo = await this._db.one<Match>(findOne, {
            match_id: id,
        });

        let matchTeams = await this._db.any<MatchTeam>(findMatchTeams, {
            match_id: id,
        });

        matchInfo.teams = matchTeams;

        return matchInfo;
    }

    public async update(id: string, fields: Partial<any>): Promise<number> {
        let { result } = await this._db.one<{ result:number }>(updateQuery, {
            team_id: id,
            team_number: fields.team_number,
            team_name: fields.team_name,
        });

        return result;
    }
}