import { createAction, props } from '@ngrx/store';

export const loginStart = '[Auth] Login Start';
export const registerStart = '[Auth] Register Start';
export const authSuccess = '[Auth] Auth Success';
export const authFail = '[Auth] Auth Fail';
export const addToCart = '[Auth] Add To Cart';
export const addToWishlist = '[Auth] Add To Wishlist';
export const autoLoadCart = '[Auth] Auto Load Cart';
export const autoLoadWishlist = '[Auth] Auto Load Wishlist';

export const login_start = createAction(loginStart, props<authStart>());
export const register_start = createAction(registerStart, props<authStart>());
export const auth_success = createAction(authSuccess, props<authSuccess>());
export const auth_fail = createAction(authFail, props<{ errorMsg: string }>());
export const add_cart = createAction(addToCart, props<cartProps>());
export const add_wishlist = createAction(addToWishlist, props<cartProps>());
export const auto_load_cart = createAction(autoLoadCart, props<cartProps>());
export const auto_load_wishlist = createAction(autoLoadWishlist, props<cartProps>());

export type authStart = { email: string, password: string };
export type authSuccess = { email: string, isAdmin: boolean, firstName?: string, lastName?: string, _id: string };
export type cartProps = { _id: string, quantity: number };
