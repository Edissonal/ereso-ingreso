import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required]],
    }); 
  }


  login() {
    if (this.LoginForm.invalid) { return }

    //aca validacion de logeo

    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    console.log(this.LoginForm.value);
    const { email, password } = this.LoginForm.value;
    this.authService.LoginUsuario( email, password)
      .then(credenciales => {
        console.log(credenciales);
        Swal.close();
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
}
