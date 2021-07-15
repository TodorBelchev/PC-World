import { createReducer, on, Action } from "@ngrx/store";

import * as SharedActions from './shared.actions';

export const featureKey = 'shared';

export interface SharedState {
    filter: {
        price: {
            from: number | null,
            to: number | null
        }
    }
}

const initialState: SharedState = {
    filter: {
        price: {
            from: null,
            to: null
        }
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
    })
)

export function sharedReducer<ActionReducer>(state: SharedState | undefined, action: Action): SharedState {
    return _sharedReducer(state, action);
}