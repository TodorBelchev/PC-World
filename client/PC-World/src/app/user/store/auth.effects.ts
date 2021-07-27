import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { AuthService } from "src/app/auth/auth.service";
import { UserService } from "../user.service";

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private userService: UserService
    ) { }

    register$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.registerStart),
        switchMap((action: AuthActions.authStart) => {
            return from(this.authService.register({ email: action.email, password: action.password }))
                .pipe(
                    map((res: any) => {
                        const user = {
                            email: res.email,
                            isAdmin: res.isAdmin,
                            firstName: res.firstName || '',
                            lastName: res.lastName || '',
                            _id: res._id,
                            phoneNumber: res.phoneNumber || '',
                            city: res.city || '',
                            location: res.location || ''
                        }
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
                        const user = {
                            email: res.email,
                            isAdmin: res.isAdmin,
                            firstName: res.firstName || '',
                            lastName: res.lastName || '',
                            _id: res._id, phoneNumber: res.phoneNumber || '',
                            city: res.city || '',
                            location: res.location || ''
                        };
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
        mergeMap((action: AuthActions.cartProps) => this.userService.addToCart({ _id: action._id, quantity: action.quantity, productType: action.productType })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )
    ));

    addToWishlist$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.addToWishlist),
        mergeMap((action: AuthActions.wishlistProps) => this.userService.addToWishlist({ _id: action._id, productType: action.productType })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )
    ));

    removeFromWishlist$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.removeFromWishlist),
        switchMap((action: AuthActions.wishlistProps) => this.userService.removeFromWishlist({ _id: action._id, productType: action.productType })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )
    ));

    removeFromCart$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.removeFromCart),
        switchMap((action: AuthActions.cartProps) => this.userService.removeFromCart({ _id: action._id, quantity: action.quantity, productType: action.productType })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )
    ));

    increaseQuantityFromCart$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.increaseQuantityFromCart),
        switchMap((action: AuthActions.cartProps) => this.userService.increaseQuantityInCart({ _id: action._id, quantity: action.quantity, productType: action.productType })
            .pipe(
                map(() => ({ type: 'Success' }))
            ))
    ));

    decreaseQuantityFromCart$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.decreaseQuantityFromCart),
        switchMap((action: AuthActions.cartProps) => this.userService.decreaseQuantityInCart({ _id: action._id, quantity: action.quantity, productType: action.productType })
            .pipe(
                map(() => ({ type: 'Success' }))
            ))
    ));

    emptyCart$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.emptyCart),
        switchMap(() => this.userService.emptyCart()
            .pipe(
                map(() => ({ type: 'Success' }))
            ))
    ));
}