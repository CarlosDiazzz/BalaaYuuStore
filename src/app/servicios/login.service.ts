import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth'; // Importa el tipo de usuario

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService: Auth) { }

  // Método de login
  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.authService, email, password)
        .then(datos => resolve(datos))
        .catch(error => reject(this.getErrorMessage(error))); // Mejor manejo del error
    });
  }

  // Método para obtener el estado de autenticación
  getAuthState(): Observable<User | null> {
    return authState(this.authService);
  }

  // Método de logout
  logout(): Promise<void> {
    return signOut(this.authService); // Retorna la promesa
  }

  // Método de registro
  register(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(this.authService, email, password)
        .then(datos => resolve(datos))
        .catch(error => reject(this.getErrorMessage(error))); // Manejo del error
    });
  }

  // Método para manejar los errores
  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'El usuario no existe.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso.';
      default:
        return 'Ocurrió un error al procesar la solicitud.';
    }
  }
}
