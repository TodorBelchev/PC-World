import { createReducer, on, Action } from "@ngrx/store";

import { IUser } from '../user.interface';

import * as AuthActions from './auth.actions';

export interface AuthState {
    user: IUser | null;
    authError: string | null;
    loading: boolean;
    errorMsg: string | null;
    cart: AuthActions.cartProps[];
    wishlist: { _id: string }[];
}

export const featureKey = 'auth';

const initialState: AuthState = {
    user: null,
    authError: null,
    loading: false,
    errorMsg: null,
    cart: [],
    wishlist: []
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
            loading: false,
            errorMsg: action.errorMsg
        }
    }),
    on(AuthActions.add_cart, (state, action) => {
        const cart = state.cart || [];
        return {
            ...state,
            cart: [...cart, { _id: action._id, quantity: action.quantity }]
        }
    }),
    on(AuthActions.add_wishlist, (state, action) => {
        const wishlist = state.wishlist || [];
        const alreadyIn = state.wishlist.find(x => x._id == action._id);
        let newWishlist = [];
        if (alreadyIn) {
            newWishlist = wishlist;
        } else {
            newWishlist = [...wishlist, { _id: action._id }];
        }
        return {
            ...state,
            wishlist: newWishlist
        }
    })
)

export function authReducer<ActionReducer>(state: AuthState | undefined, action: Action): AuthState {
    return _authReducer(state, action);
}