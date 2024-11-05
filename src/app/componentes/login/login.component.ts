import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      response => {
        alert(response); // Mostrar mensaje de éxito
        this.router.navigate(['/home']); // Redirigir al inicio
      },
      error => {
        alert('Usuario o contraseña incorrectos'); // Mensaje de error
      }
    );
  }
}

