import { User } from '../models/User';

export class LoginUser {
    static readonly type = '[User] Login';

    constructor(public payload: any) {}
}

