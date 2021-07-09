import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { CreateNotebookComponent } from './notebook/create-notebook/create-notebook.component';
import { CreateComponentComponent } from './parts/create-component/create-component.component';
import { PartsComponent } from './parts/parts/parts.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notebooks/create', component: CreateNotebookComponent },
  { path: 'components', component: PartsComponent },
  { path: 'components/create', component: CreateComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
