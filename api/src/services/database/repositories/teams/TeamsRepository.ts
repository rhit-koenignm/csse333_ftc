import { AppDatabase } from '../../database';
import { sql } from '../../util';
import { Team } from '../../../../models/Team';

const findAllQuery = sql('teams/findAll.sql')

export class TeamsRepository {
    constructor(private _db: AppDatabase) {}

    public async findAll() : Promise<Team[]> {
        return this._db.any(findAllQuery);
    }
}