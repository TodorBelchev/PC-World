import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PromoPageComponent } from './promo-page/promo-page.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'dashboard', canActivate: [AdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'notebooks', loadChildren: () => import('./notebook/notebook.module').then(m => m.NotebookModule) },
  { path: 'components', loadChildren: () => import('./parts/parts.module').then(m => m.PartsModule) },
  { path: 'monitors', loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule) },
  { path: 'promotions/:productType/:id', component: PromoPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: AboutComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
