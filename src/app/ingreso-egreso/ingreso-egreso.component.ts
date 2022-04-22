import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingresoEgreso.models';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import  * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit ,OnDestroy{


  ingresoForm: FormGroup;
  tipo:string ='ingreso';
  cargando:boolean = false;
  loadingSubs:Subscription;

  constructor(private fb:FormBuilder,
              private ingresoEgresoService:IngresoEgresoService,
              private store:Store<AppState>) { }

  ngOnInit(): void {
  
    
   this.loadingSubs = this.store.select('ui').subscribe(({isloading})=> this.cargando = isloading);
    console.log(this.cargando);

    this.ingresoForm = this.fb.group({
    descripcion:['',Validators.required],
    monto:['',Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  guardar(){
    this.store.dispatch(ui.isloading());


   

    if(this.ingresoForm.invalid){
      return;
    }

    /*console.log(this.ingresoForm.value);
    console.log(this.tipo);*/

    const {descripcion,monto} = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion,monto,this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then(() =>{
      this.ingresoForm.reset();
      this.store.dispatch(ui.stoploading());
      Swal.fire('Registro creado',descripcion, 'success');
    })
    .catch(err =>  {
      this.store.dispatch(ui.stoploading());
      Swal.fire('Error',err.message, 'error')
    });
  }

}
