import { createAction, props } from '@ngrx/store';

export const loginStart = '[Auth] Login Start';
export const registerStart = '[Auth] Register Start';
export const authSuccess = '[Auth] Auth Success';
export const authFail = '[Auth] Auth Fail';

export const login_start = createAction(loginStart, props<authStart>());
export const register_start = createAction(registerStart, props<authStart>());
export const auth_success = createAction(authSuccess, props<authSuccess>());
export const auth_fail = createAction(authFail, props<{ errorMsg: string }>());

export type authStart = { email: string, password: string };
export type authSuccess = { email: string, isAdmin: boolean, firstName?: string, lastName?: string, _id: string };

