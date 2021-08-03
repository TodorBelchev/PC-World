import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(): Observable<boolean | UrlTree> | boolean {
    return this.userService.loadProfile().pipe(
      catchError(() => {
        return of(null);
      }),
      map(user => {
        if (user?.isAdmin) {
          return true;
        } else {
          return this.router.parseUrl('/');
        }
      })
    )
  }

}
