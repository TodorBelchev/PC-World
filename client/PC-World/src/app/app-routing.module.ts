import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PromoPageComponent } from './promo-page/promo-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'dashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'notebooks', loadChildren: () => import('./notebook/notebook.module').then(m => m.NotebookModule) },
  { path: 'components', loadChildren: () => import('./parts/parts.module').then(m => m.PartsModule) },
  { path: 'monitors', loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule) },
  { path: 'promotions/:productType/:id', component: PromoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
