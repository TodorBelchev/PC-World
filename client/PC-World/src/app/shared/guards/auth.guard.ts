import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | boolean {
    if (childRoute.url[0].path === 'cart' || childRoute.url[0].path === 'wishlist') {
      return true;
    }

    return this.userService.verifyProfile(childRoute.url[0].path).pipe(
      catchError(() => {
        return of(null);
      }),
      map(user => {
        if (user) {
          return true;
        } else {
          return this.router.parseUrl('/');
        }
      })
    )
  }

}
