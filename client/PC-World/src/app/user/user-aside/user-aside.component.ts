import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import * as authSelectors from '../store/auth.selectors';
import { IUser } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-aside',
  templateUrl: './user-aside.component.html',
  styleUrls: ['./user-aside.component.scss']
})
export class UserAsideComponent {
  user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);

  constructor(
    private store: Store<AppState>
  ) { }

}
