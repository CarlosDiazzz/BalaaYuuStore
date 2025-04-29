import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabecero',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedInUser: string | null = null;//alamcena el email del usuario logueado


  constructor(
    private loginService: LoginService,
    private router: Router
  ){}


  ngOnInit() {
    this.loginService.getAuthState().subscribe(usuario =>{
      if(usuario){
        this.isLoggedIn = true;
        this.loggedInUser = usuario.email;
      }else{
        this.isLoggedIn = false;

      }
    });
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }


}
