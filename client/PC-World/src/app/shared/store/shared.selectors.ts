import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app-state.interface";
import { SharedState, featureKey } from "./shared.reducer";


export const selectFeature = createFeatureSelector<AppState, SharedState>(featureKey);
export const selectFilter = createSelector(
    selectFeature,
    (state: SharedState) => <IFilter | null>state.filter
);

export interface IFilter {
    price: {
        from: number;
        to: number;
    }
}