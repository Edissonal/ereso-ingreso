import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './app/auth/register/register.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { LoginComponent } from './app/auth/login/login.component';
import { AuthGuard } from './app/services/auth.guard';
import { dashboardRoutes } from './app/dashboard/dashboard.routes';


const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
  path: '',
  //canActivate:[AuthGuard],
  canLoad:[AuthGuard],
  loadChildren:() => import('./app/ingreso-egreso/ingreso-egreso.module').then(m => m.IngresoEgresoModule)
},
  {path:'**',redirectTo:''},
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule 
  ],
  providers: [],
})
export class AppRoutingModule {}