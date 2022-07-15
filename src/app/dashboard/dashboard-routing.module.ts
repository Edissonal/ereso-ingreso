import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
//import { AuthGuard } from '../services/auth.guard';

const rutashijas : Routes =[

  {
      path: '',
      component: DashboardComponent,
      children: dashboardRoutes,
   //   canActivate:[AuthGuard]
    },
  
]; 


@NgModule({
  imports: [
    RouterModule.forChild( rutashijas )
  ],exports:[
    RouterModule
  ],
  declarations: []
})
export class DashboardRoutingModule { }
