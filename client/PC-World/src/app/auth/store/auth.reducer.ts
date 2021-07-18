import { createReducer, on, Action } from "@ngrx/store";

import { IUser } from '../user.interface';

import * as AuthActions from './auth.actions';

export interface AuthState {
    user: IUser | null;
    authError: string | null;
    loading: boolean;
    errorMsg: string | null;
    cart: AuthActions.cartProps[];
    wishlist: AuthActions.wishlistProps[];
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
    on(AuthActions.add_cart, AuthActions.auto_load_cart, (state, action) => {
        const cart = [...state.cart] || [];
        const isAlreadyIn = cart.find(x => x._id == action._id);
        if (isAlreadyIn) {
            const index = cart.indexOf(isAlreadyIn);
            const quantity = cart[index].quantity;
            cart[index] = {
                ...cart[index],
                quantity: quantity + 1
            }
        } else {
            cart.push({ _id: action._id, quantity: action.quantity, productType: action.productType });
        }
        return {
            ...state,
            cart: cart
        }
    }),
    on(AuthActions.add_wishlist, AuthActions.auto_load_wishlist, (state, action) => {
        const wishlist = state.wishlist || [];
        const alreadyIn = state.wishlist.find(x => x._id == action._id);
        let newWishlist = [];
        if (alreadyIn) {
            newWishlist = wishlist;
        } else {
            newWishlist = [...wishlist, { _id: action._id, productType: action.productType }];
        }
        return {
            ...state,
            wishlist: newWishlist
        }
    }),
    on(AuthActions.remove_from_wishlist, (state, action) => {
        let newWishlist = [...state.wishlist];
        const item = state.wishlist.find(x => x._id === action._id);
        if (item) {
            const index = state.wishlist.indexOf(item);
            newWishlist.splice(index, 1);
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