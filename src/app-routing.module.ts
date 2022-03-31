import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './app/auth/register/register.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { LoginComponent } from './app/auth/login/login.component';
import { dashboardRoutes } from './app/dashboard/dashboard.routing';


const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    children:dashboardRoutes
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