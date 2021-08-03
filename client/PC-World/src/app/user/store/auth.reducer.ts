import { createReducer, on, Action } from "@ngrx/store";

import { IUser } from '../../shared/interfaces/user.interface';

import * as AuthActions from './auth.actions';

export interface AuthState {
    user: IUser | null;
    cart: AuthActions.cartProps[];
    wishlist: AuthActions.wishlistProps[];
    message: AuthActions.msgProps | null;
    isInitializing: boolean;
}

export const featureKey = 'auth';

const initialState: AuthState = {
    user: null,
    cart: [],
    wishlist: [],
    message: null,
    isInitializing: true
};

const _authReducer = createReducer(
    initialState,
    on(AuthActions.auth_success, (state, action) => {
        return {
            ...state,
            loading: false,
            errorMsg: '',
            isInitializing: true,
            user: {
                email: action.email,
                isAdmin: action.isAdmin,
                firstName: action.firstName,
                lastName: action.lastName,
                _id: action._id,
                phoneNumber: action.phoneNumber,
                city: action.city,
                location: action.location
            }
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
    }),
    on(AuthActions.remove_from_cart, (state, action) => {
        let newCart = [...state.cart];
        const item = state.cart.find(x => x._id === action._id);
        if (item) {
            const index = state.cart.indexOf(item);
            newCart.splice(index, 1);
        }
        return {
            ...state,
            cart: newCart
        }
    }),
    on(AuthActions.decrease_quantity_from_cart, (state, action) => {
        let newCart = [...state.cart];
        const item = state.cart.find(x => x._id === action._id);
        if (item) {
            const index = state.cart.indexOf(item);
            const newItem = { ...newCart[index], quantity: newCart[index].quantity - 1 };
            newCart.splice(index, 1, newItem);
        }
        return {
            ...state,
            cart: newCart
        }
    }),
    on(AuthActions.increase_quantity_from_cart, (state, action) => {
        let newCart = [...state.cart];
        const item = state.cart.find(x => x._id === action._id);
        if (item) {
            const index = state.cart.indexOf(item);
            const newItem = { ...newCart[index], quantity: newCart[index].quantity + 1 };
            newCart.splice(index, 1, newItem);
        }
        return {
            ...state,
            cart: newCart
        }
    }),
    on(AuthActions.empty_cart, (state) => {
        return {
            ...state,
            cart: []
        }
    }),
    on(AuthActions.auth_check_fail, (state) => {
        return {
            ...state,
            user: null
        }
    }),
    on(AuthActions.add_message, (state, action) => {
        return {
            ...state,
            message: action
        }
    }),
    on(AuthActions.clear_message, (state) => {
        return {
            ...state,
            message: null
        }
    }),
    on(AuthActions.logout_user, (state) => {
        return {
            ...state,
            user: null
        }
    })
)

export function authReducer<ActionReducer>(state: AuthState | undefined, action: Action): AuthState {
    return _authReducer(state, action);
}