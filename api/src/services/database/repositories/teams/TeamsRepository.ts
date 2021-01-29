import { AppDatabase } from '../../database';
import { sql } from '../../util';
import { Team } from '../../../../models/Team';

const findAllQuery = sql('teams/findAll.sql');
const updateQuery = sql('teams/update.sql');

export class TeamsRepository {
    constructor(private _db: AppDatabase) {}

    public async findAll() : Promise<Team[]> {
        return this._db.any(findAllQuery);
    }

    public async update(id: string, fields: Partial<Team>): Promise<number> {
        let { result } = await this._db.one<{ result:number }>(updateQuery, {
            team_id: id,
            team_number: fields.team_number,
            team_name: fields.team_name,
        });

        return result;
    }
}