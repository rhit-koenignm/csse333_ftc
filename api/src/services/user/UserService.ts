import { injectable, inject } from 'inversify';
import { Pool } from 'pg';

import { ProvideTransient } from '../../decorators';
import { AppDatabase } from '../database/database';

@ProvideTransient(UserService)
export class UserService {

    @inject("AppDatabase")
    private _db: AppDatabase;

    public async findUser(): Promise<void> {
        // console.log("FindUser called " + this._pool);
    }
}