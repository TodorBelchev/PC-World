import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './auth/cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { OrdersListComponent } from './auth/orders-list/orders-list.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { WarrantiesComponent } from './auth/warranties/warranties.component';
import { WishlistComponent } from './auth/wishlist/wishlist.component';
import { HomeComponent } from './home/home.component';
import { CreateMonitorComponent } from './monitor/create-monitor/create-monitor.component';
import { DetailsComponent } from './notebook/details/details.component';
import { NotebooksListComponent } from './notebook/notebooks-list/notebooks-list.component';
import { CreateComponent } from './parts/create/create.component';
import { PartsComponent } from './parts/parts/parts.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'profile/:id/orders', component: OrdersListComponent },
  { path: 'profile/:id/warranties', component: WarrantiesComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent },
  { path: 'notebooks', component: NotebooksListComponent },
  { path: 'notebooks/:id', component: DetailsComponent },
  { path: 'components', component: PartsComponent },
  { path: 'components/create', component: CreateComponent },
  { path: 'monitors/create', component: CreateMonitorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
