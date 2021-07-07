import { createReducer, on } from "@ngrx/store";

import { IUser } from '../user';
import { auth_success, login_start, register_start } from './auth.actions';

export interface State {
    user: IUser | null;
    authError: string | null;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
};

const _authReducer = createReducer(
    initialState,
    on(login_start, register_start, state => {
        return {
            ...state,
            loading: true
        }
    }),
    on(auth_success, (state, action) => {
        return {
            ...state,
            user: {
                email: action.email,
                isAdmin: action.isAdmin,
                firstName: action.firstName,
                lastName: action.lastName,
                _id: action._id
            }
        }
    })
)

export function authReducer<ActionReducer>(state: State, action: any) {
    return _authReducer(state, action);
}