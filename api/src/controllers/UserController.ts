import {
    Controller,
    Post,
    Get,
    Route,
    Path,
    Body,
} from 'tsoa';

import { AppDatabase } from '../services/database/database';

import { ProvideTransient } from '../decorators';
import { inject } from 'inversify';
import { pathToFileURL } from 'url';

interface RegisterUserResponse {
    email?: string,
    first_name?: string,
    last_name?: string,
    errorMessage?: string,
    success : boolean;
}
interface UserLoginResponse {
    errorMessage?: string;
    success : boolean;
}



@Route("user")
@ProvideTransient(UserController)
export class UserController extends Controller {

    constructor(
        @inject("AppDatabase") private _db: AppDatabase
    ) {
        super();
    }

    // @Get("")
    // public async getAuth(): Promise<string> {
    //     this._userService.findUser();
    //     return "It works!";
    // }

    @Post("login")
    public async userLogin(
        @Body() body: any
    ): Promise<UserLoginResponse> {
        let result = await this._db.users.userLogin(body.email, body.password);
        if(result==0){
            return {success: true};
        } else  {
            return {success:false, errorMessage: "Invalid Login, please try again."};
        }
    }


    @Post("register")
    public async registerUser(
        @Body() body: any
    ): Promise<RegisterUserResponse> {
        let result = await this._db.users.registerUser(body.email, body.password, body.first_name, body.last_name);
        if(result==1){
            return {success: false, errorMessage: "Email already exists. Try again."};
        } else {
            return {success: true};
        }
    }
}
