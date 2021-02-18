import { AppDatabase } from '../../database';
import { sql } from '../../util';
import { Tournament } from '../../../../models/Tournament';

const findAllQuery = sql('tournaments/findAll.sql');
const findOneQuery = sql('tournaments/findOne.sql');

export class TournamentsRepository {
    constructor(private _db: AppDatabase) {}

    public async findAll() : Promise<Tournament[]> {
        return this._db.any(findAllQuery);
    }

    public async findOne(tournId: string): Promise<Tournament> {
        return this._db.one(findOneQuery, { tournId });
    }
}