import {
    Controller,
    Post,
    Get,
    Route,
} from 'tsoa';

import { UserService } from '../services/user/UserService';

import { ProvideTransient } from '../decorators';
import { inject } from 'inversify';

@Route("user")
@ProvideTransient(UserController)
export class UserController extends Controller {

    constructor(
        @inject(UserService) private _userService: UserService,
    ) {
        super();
    }

    @Get("api")
    public async getAuth(): Promise<string> {
        this._userService.findUser();
        return "It works!";
    }

    @Post("register")
    public async registerUser(): Promise<string> {
        // Call stored procedure module here
        return "return token here";
    }
}
