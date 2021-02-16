import { AppDatabase } from '../../database';
import { sql } from '../../util';
import { Tournament } from '../../../../models/Tournament';

const findAllQuery = sql('tournaments/findAll.sql');

export class TournamentsRepository {
    constructor(private _db: AppDatabase) {}

    public async findAll() : Promise<Tournament[]> {
        return this._db.any(findAllQuery);
    }

}