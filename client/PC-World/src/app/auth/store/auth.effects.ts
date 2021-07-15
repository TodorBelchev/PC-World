import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';

import { AuthService } from "../auth.service";
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) { }

    register$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.registerStart),
        switchMap((action: AuthActions.authStart) => {
            return from(this.authService.register({ email: action.email, password: action.password }))
                .pipe(
                    map((res: any) => {
                        const user = { email: res.email, isAdmin: res.isAdmin, firstName: res.firstName || '', lastName: res.lastName || '', _id: res._id };
                        localStorage.setItem('user', JSON.stringify(user));
                        return AuthActions.auth_success(user);
                    }),
                    catchError(error => {
                        return of(AuthActions.auth_fail({ errorMsg: error.message }));
                    })
                )
        }))
    );

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loginStart),
        switchMap((action: AuthActions.authStart) => {
            return from(this.authService.login({ email: action.email, password: action.password }))
                .pipe(
                    map((res: any) => {
                        const user = { email: res.email, isAdmin: res.isAdmin, firstName: res.firstName || '', lastName: res.lastName || '', _id: res._id };
                        localStorage.setItem('user', JSON.stringify(user));
                        return AuthActions.auth_success(user);
                    }),
                    catchError(error => {
                        return of(AuthActions.auth_fail({ errorMsg: error.message }));
                    })
                )
        })
    ));

    addToCart$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.addToCart),
        mergeMap((action: AuthActions.cartProps) => this.authService.addToCart({ _id: action._id, quantity: action.quantity })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )
    ));

    addToWishlist$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.addToWishlist),
        mergeMap((action: AuthActions.cartProps) => this.authService.addToWishlist({ _id: action._id, quantity: action.quantity })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )
    ));
}