import { createReducer, on, Action } from "@ngrx/store";

import { IUser } from '../user';
import * as AuthActions from './auth.actions';

export interface State {
    user: IUser | null;
    authError: string | null;
    loading: boolean;
    errorMsg: string | null;
}

export const featureKey = 'auth';

const initialState: State = {
    user: null,
    authError: null,
    loading: false,
    errorMsg: null
};

const _authReducer = createReducer(
    initialState,
    on(AuthActions.login_start, AuthActions.register_start, state => {
        return {
            ...state,
            loading: true
        }
    }),
    on(AuthActions.auth_success, (state, action) => {
        return {
            ...state,
            loading: false,
            errorMsg: null,
            user: {
                email: action.email,
                isAdmin: action.isAdmin,
                firstName: action.firstName,
                lastName: action.lastName,
                _id: action._id
            }
        }
    }),
    on(AuthActions.auth_fail, (state, action) => {
        return {
            ...state,
            errorMsg: action.errorMsg
        }
    })
)

export function authReducer<ActionReducer>(state: State | undefined, action: Action): State {
    return _authReducer(state, action);
}