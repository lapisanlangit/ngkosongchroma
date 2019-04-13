import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../models/User';
import { LoginUser } from '../actions/user.action';


export class UserStateModel {
    users: User[];
}

@State<UserStateModel>({
    name: 'usernya',
    defaults: {
        users: []
    }
})
export class UserState {

    constructor() { }

    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users;
    }

    
    static getToken(state: UserStateModel) {
        // return state.users.token;
    }

    @Action(LoginUser)
    login(ctx: StateContext<UserStateModel>, action: LoginUser) {
        const state = ctx.getState();
        // console.log(state)
        ctx.setState({
            ...state,
            users: [
                ...state.users,
                action.payload,
            ]
        });
    }



}