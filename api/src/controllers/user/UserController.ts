import {
    Controller,
    Post,
    Get,
    Route,
} from 'tsoa';

import { ProvideSingleton } from '../../container';
@Route("user")
@ProvideSingleton(UserController)
export class UserController extends Controller {

    @Get("api")
    public async getAuth(): Promise<string> {
        return "It works!";
    }

    @Post("register")
    public async registerUser(): Promise<string> {

        return "return token here";
    }
}