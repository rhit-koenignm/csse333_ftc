import { injectable, inject } from 'inversify';
import { Pool } from 'pg';

import { ProvideTransient } from '../../decorators';

@ProvideTransient(UserService)
export class UserService {

    @inject(Pool)
    private _pool: Pool;

    public async findUser(): Promise<void> {
        // console.log("FindUser called " + this._pool);
        // This is just an example and won't run
        const client = await this._pool.connect();
        const query = await client.query('SELECT * FROM users');

        // We MUST release the client when we're done, or else the
        // connection will leak
        client.release();
    }
}