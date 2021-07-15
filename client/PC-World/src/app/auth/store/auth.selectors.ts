import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/app-state.interface";
import { IUser } from "../user.interface";
import { AuthState } from "./auth.reducer";

export const selectFeature = createFeatureSelector<AppState, AuthState>('auth');
export const selectUser = createSelector(
    selectFeature,
    (state: AuthState) => <IUser>state.user
);

export const selectCart = createSelector(
    selectFeature,
    (state: AuthState) => state.cart
)

export const selectWishlist = createSelector(
    selectFeature,
    (state: AuthState) => state.wishlist
)