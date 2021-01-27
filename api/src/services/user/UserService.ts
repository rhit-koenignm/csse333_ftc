import { injectable, inject } from 'inversify';
import { Pool } from 'pg';

import { ProvideTransient } from '../../decorators';

@ProvideTransient(UserService)
export class UserService {

    @inject(Pool)
    private _pool: Pool;

    public findUser(): void {
        console.log("FindUser called " + this._pool);
    }
}