import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from "src/app/auth/auth.service";
import { UserService } from "../user.service";

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }


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