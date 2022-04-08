import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  registroForm!: FormGroup;
  uisubscription!: Subscription;
  cargando: boolean = false;

  constructor(private fb: FormBuilder,
              private authservice: AuthService,
              private router: Router,
              private store:Store<AppState>
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({

      nombre: ['', Validators.required],
      correo: ['', [Validators.required,Validators.email]],
      password:['',Validators.required]
    });

    this.uisubscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isloading);
  }


  crearUsuario() {


    if (this.registroForm.invalid) { return; }

    //validacione
  /*  Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      }
    });*/

    this.store.dispatch(ui.isloading());
    
    console.log(this.registroForm.value);
    const { nombre, correo, password } = this.registroForm.value;
    this.authservice.crearusuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);
    //    Swal.close();
    this.store.dispatch(ui.stoploading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
       
        })

      });

    
  }

  ngOnDestroy(): void {
    this.uisubscription.unsubscribe();
  }

}
