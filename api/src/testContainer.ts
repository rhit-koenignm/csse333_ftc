import './register'
import container from './container';
import { UserService } from './services/user/UserService';
import { UserController } from './controllers/user/UserController';

let service = container.get(UserService);
let controller = container.get(UserController);

console.log(service);