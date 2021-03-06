import { AppDatabase } from '../../database';
import { sql } from '../../util';
import { Team, TeamRanking } from '../../../../models/Team';

const findAllQuery = sql('teams/findAll.sql');
const updateQuery = sql('teams/update.sql');
const getRankingsQuery = sql('teams/getRankings.sql');
const createQuery = sql('teams/create.sql');
const findTournTeamsQuery = sql('teams/findTournamentTeams.sql');
export class TeamsRepository {
    constructor(private _db: AppDatabase) {}

    public async findAll() : Promise<Team[]> {
        return this._db.any(findAllQuery);
    }

    public async getTournamentRankings(tournId: string): Promise<TeamRanking[]> {
        return this._db.any<TeamRanking>(getRankingsQuery, { tournId });
    }

    public async update(id: string, fields: Partial<Team>): Promise<number> {
        let { result } = await this._db.one<{ result:number }>(updateQuery, {
            team_id: id,
            team_number: fields.team_number,
            team_name: fields.team_name,
        });

        return result;
    }

    public async create(team_number: number, team_name: string): Promise<string> {
        let result = await this._db.one<{create_team: string}>(createQuery, {
            team_number,
            team_name,
        });
        return result.create_team;
    }

    public async findTournamentTeams(tournId: string): Promise<Team[]> {
        return this._db.any<Team>(findTournTeamsQuery, { tournId });
    }
}