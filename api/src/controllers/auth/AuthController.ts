import {
    Controller,
    Get,
    Route,
} from 'tsoa';

import { ProvideSingleton } from '../../container';
@Route("auth")
@ProvideSingleton(AuthController)
export class AuthController {

    @Get("api")
    public async getAuth(): Promise<string> {
        return "It works!";
    }
}