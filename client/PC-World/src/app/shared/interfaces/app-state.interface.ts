import { AuthState } from "../../user/store/auth.reducer";

export interface AppState {
    auth: AuthState;
}