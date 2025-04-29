import { Component } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  imports: [FormsModule, RouterModule, CommonModule],
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  // Método de registro
  register() {
    this.loginService.register(this.email, this.password)
      .then((response) => {
        this.successMessage = 'Registro exitoso. Ahora puedes iniciar sesión.';
        this.errorMessage = ''; // Limpiar el mensaje de error si el registro fue exitoso
      })
      .catch((error) => {
        this.errorMessage = error; // Mostrar el mensaje de error
        this.successMessage = ''; // Limpiar el mensaje de éxito si hay error
      });
      this.router.navigate(['/']);
  }
}
