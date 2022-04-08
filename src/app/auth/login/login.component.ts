import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  LoginForm!: FormGroup;
  cargando: boolean = false;
  uisubscription!: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router,
              private store:Store<AppState>) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required]],
    });

   this.uisubscription = this.store.select('ui').subscribe(
      ui => {
        this.cargando = ui.isloading;
        console.log('cargando Subs');
      }
    )
  }


  login() {
    if (this.LoginForm.invalid) { return }

    this.store.dispatch(ui.isloading());

    //aca validacion de logeo

   /* Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      }
    });*/
    
    console.log(this.LoginForm.value);
    const { email, password } = this.LoginForm.value;
    this.authService.LoginUsuario( email, password)
      .then(credenciales => {
        console.log(credenciales);
        //Swal.close();
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
