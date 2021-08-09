import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';
import { AppState } from '../interfaces/app-state.interface';
import * as authActions from '../../user/store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>
  ) { }

  canActivate(): Observable<boolean | UrlTree> | boolean {
    return this.userService.loadProfile().pipe(
      catchError(() => {
        return of(null);
      }),
      map(user => {
        if (!user) {
          this.store.dispatch(authActions.auth_check_fail());
          return this.router.parseUrl('/auth/login');
        }
        if (user?.isAdmin) {
          return true;
        } else {
          return this.router.parseUrl('/');
        }
      })
    )
  }

}
