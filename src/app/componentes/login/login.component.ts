import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    const validUsername = 'usuario'; // Usuario esperado
    const validPassword = 'admin123'; // Contraseña esperada

    if (this.username === validUsername && this.password === validPassword) {
      this.router.navigate(['/home']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
