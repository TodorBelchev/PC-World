import { AuthState } from "../auth/store/auth.reducer";
import { SharedState } from "./store/shared.reducer";

export interface AppState {
    auth: AuthState;
    shared: SharedState
}