import { createAction, props } from '@ngrx/store';

export const authSuccess = '[Auth] Auth Success';
export const authCheckFail = '[Auth] Auth Check Fail';
export const addToCart = '[Auth] Add To Cart';
export const addToWishlist = '[Auth] Add To Wishlist';
export const autoLoadCart = '[Auth] Auto Load Cart';
export const autoLoadWishlist = '[Auth] Auto Load Wishlist';
export const removeFromWishlist = '[Auth] Remove From Wishlist';
export const removeFromCart = '[Auth] Remove From Cart';
export const decreaseQuantityFromCart = '[Auth] Decrease Quantity From Cart';
export const increaseQuantityFromCart = '[Auth] Increase Quantity From Cart';
export const emptyCart = '[Auth] Empty Cart';
export const addMessage = '[Auth] Add Message';
export const clearMessage = '[Auth] Clear Message';
export const logoutUser = '[Auth] Logout User';

export const auth_success = createAction(authSuccess, props<authSuccess>());
export const auth_check_fail = createAction(authCheckFail);
export const add_cart = createAction(addToCart, props<cartProps>());
export const add_wishlist = createAction(addToWishlist, props<wishlistProps>());
export const auto_load_cart = createAction(autoLoadCart, props<cartProps>());
export const auto_load_wishlist = createAction(autoLoadWishlist, props<wishlistProps>());
export const remove_from_wishlist = createAction(removeFromWishlist, props<wishlistProps>());
export const remove_from_cart = createAction(removeFromCart, props<cartProps>());
export const decrease_quantity_from_cart = createAction(decreaseQuantityFromCart, props<cartProps>());
export const increase_quantity_from_cart = createAction(increaseQuantityFromCart, props<cartProps>());
export const empty_cart = createAction(emptyCart);
export const add_message = createAction(addMessage, props<msgProps>());
export const clear_message = createAction(clearMessage);
export const logout_user = createAction(logoutUser);

export type authStart = { email: string, password: string };
export type authSuccess = { email: string, isAdmin: boolean, firstName?: string, lastName?: string, _id: string, phoneNumber?: string, city: string, location: string };
export type cartProps = { _id: string, quantity: number, productType: string };
export type wishlistProps = { _id: string, productType: string };
export type msgProps = { text: string, msgType: string };
