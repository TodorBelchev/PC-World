import { createAction, props } from '@ngrx/store';

export const login_start = createAction('[Auth] Login Start', props<{email: string, password: string}>());
export const register_start = createAction('[Auth] Register Start', props<{email: string, password: string}>());
export const auth_success = createAction('[Auth] Auth Success', props<{ email: string, isAdmin: boolean, firstName?: string, lastName?: string, _id: string }>());