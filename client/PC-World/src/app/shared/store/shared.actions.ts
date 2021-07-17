import { createAction, props } from '@ngrx/store';
import { IComment } from '../comment';

export const filterSuccess = '[Shared] Filter Success';
export const commentCreated = '[Shared] Comment Created';

export const filter_success = createAction(filterSuccess, props<filterStart>());
export const comment_created = createAction(commentCreated, props<IComment>());

export type filterStart = { from: number, to: number };