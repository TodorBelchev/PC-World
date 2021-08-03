import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/interfaces/app-state.interface";
import { IUser } from "../../shared/interfaces/user.interface";
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

export const selectMessage = createSelector(
    selectFeature,
    (state: AuthState) => state.message
)

export const selectState = createSelector(
    selectFeature,
    (state: AuthState) => state
)