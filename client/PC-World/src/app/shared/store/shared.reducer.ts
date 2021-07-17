import { createReducer, on, Action } from "@ngrx/store";
import { IComment } from "../comment";

import * as SharedActions from './shared.actions';

export const featureKey = 'shared';

export interface SharedState {
    filter: {
        price: {
            from: number | null,
            to: number | null
        }
    },
    commentCreated: IComment
}

const initialState: SharedState = {
    filter: {
        price: {
            from: null,
            to: null
        }
    },
    commentCreated: {
        _id: '',
        body: {
            comment: '',
            firstName: '',
            lastName: '',
            rating: 0
        },
        modelId: '',
        createdAt: ''
    }
}

const _sharedReducer = createReducer(
    initialState,
    on(SharedActions.filter_success, (state, action) => {
        const filter = state.filter;
        return {
            ...state,
            filter: {
                ...filter,
                price: {
                    from: action.from,
                    to: action.to
                }
            }
        }
    }),
    on(SharedActions.comment_created, (state, action) => {
        return {
            ...state,
            commentCreated: action
        }
    })
)

export function sharedReducer<ActionReducer>(state: SharedState | undefined, action: Action): SharedState {
    return _sharedReducer(state, action);
}