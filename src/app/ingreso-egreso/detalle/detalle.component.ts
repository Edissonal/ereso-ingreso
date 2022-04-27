import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingresoEgreso.models';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStatewhithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit , OnDestroy{

ingresosEgresos:IngresoEgreso[]=[];
ingresossubs:Subscription;

  constructor(private store:Store<AppStatewhithIngreso>,
              private ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit(): void {
    
   this.ingresossubs= this.store.select('ingresoEgresos').subscribe(({items}) => this.ingresosEgresos = items);
  }

  borrar(uid:string){
   this.ingresoEgresoService.borrarEgreso(uid)
   .then(() => Swal.fire('Borrado','Item Borrado', 'warning') )
   .catch(err => Swal.fire('Error',err.message,'error'))  

  }

  ngOnDestroy(): void {
    this.ingresossubs.unsubscribe();
  }

}
