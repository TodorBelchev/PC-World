import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/app-state.interface";
import { AuthState } from "./auth.reducer";

export const selectFeature = createFeatureSelector<AppState, AuthState>('auth');
export const selectUser = createSelector(
    selectFeature,
    (state: AuthState) => state.user
);