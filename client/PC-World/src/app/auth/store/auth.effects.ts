import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../auth.service";
import { map, switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { from } from "rxjs";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) { }
    register$ = createEffect(() => this.actions$.pipe(
        ofType('[Auth] Register Start'),
        switchMap((action: { email: string, password: string }) => {
            console.log(action);
            
            return from(this.authService.register({ email: action.email, password: action.password }))
                .pipe(
                    map((res: any) => {
                        console.log(res);
                        return AuthActions.auth_success({ email: res.email, isAdmin: res.isAdmin, firstName: res.firstName || '', lastName: res.lastName || '', _id: res._id })
                    })
                )
        })
    )
    );
}