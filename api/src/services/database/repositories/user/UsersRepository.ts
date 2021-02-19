import { AppDatabase } from "../../database";
import { sql } from '../../util';
import { Person } from '../../../../models/Person';


const registerUserQuery = sql('user/registerUser.sql');
const loginUserQuery = sql('user/userLogin.sql');


export class UsersRepository {
    constructor(private _db: AppDatabase) {}

        public async registerUser(
            user_email: string,
            user_password: string,
            user_first_name: string,
            user_last_name: string
        ) : Promise<number> {
            let { result } = await this._db.one<{ result:number }>(registerUserQuery, {
                email: user_email,
                password: user_password,
                first_name: user_first_name,
                last_name: user_last_name
            });
            return result;
        }

        public async userLogin(user_email: string, user_password: string) : Promise<number> {
                let result = await this._db.one<{ login_user :number }>(loginUserQuery, {
                    email: user_email,
                    password: user_password,
                });
            return result.login_user;
        }
}