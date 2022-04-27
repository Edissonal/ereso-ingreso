import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { IngresoEgreso } from '../models/ingresoEgreso.models';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresosEgresosActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  constructor(private store:Store<AppState>,
              private IngresoEgresoService:IngresoEgresoService) { }

  userSubs:Subscription;
  ingresosSubs:Subscription;

  ngOnInit(): void {
   
   this.userSubs = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(
       ({user}) =>{
     this.ingresosSubs =  this.IngresoEgresoService.initIngresosEgresosListener(user.uid)
       .subscribe((ingresosEgresosFB:any) =>{
         this.store.dispatch(ingresosEgresosActions.setItems({items:ingresosEgresosFB}))
       })
       }
    )
  }

  ngOnDestroy(): void {
    this.ingresosSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

}
