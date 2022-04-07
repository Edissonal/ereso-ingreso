import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup ;

  constructor(private fb: FormBuilder,
              private authservice: AuthService,
              private router:Router
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({

      nombre: ['', Validators.required],
      correo: ['', [Validators.required,Validators.email]],
      password:['',Validators.required]
    });
  }


  crearUsuario() {


    if (this.registroForm.invalid) { return; }

    //validacione
    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    console.log(this.registroForm.value);
    const { nombre, correo, password } = this.registroForm.value;
    this.authservice.crearusuario(nombre, correo, password)
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
