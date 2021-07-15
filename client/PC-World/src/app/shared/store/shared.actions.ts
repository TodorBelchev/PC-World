import { createAction, props } from '@ngrx/store';

export const filterSuccess = '[Shared] Filter Success';

export const filter_success = createAction(filterSuccess, props<filterStart>());

export type filterStart = { from: number, to: number };