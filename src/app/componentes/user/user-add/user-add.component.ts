import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../../../interfaces/user';
import { Role } from '../../../interfaces/role';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-add',
  standalone: true,
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAddComponent {
  hide = signal(true);

  userForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    contraseña: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    role: new FormControl<Role | null>(null, Validators.required),
    estado: new FormControl(true),
  });

  roles: Role[] = [
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Vendedor' },
  ];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.userForm.valid) {
      const selectedRole = this.userForm.get('role')?.value;

      const newUser: User = {
        id: 0,
        nombre: this.userForm.get('nombre')?.value!,
        apellido: this.userForm.get('apellido')?.value!,
        correo: this.userForm.get('correo')?.value!,
        contraseña: this.userForm.get('contraseña')?.value!,
        role: selectedRole || { id: 0, name: '' }, // Usa el objeto Role
        fecha_creacion: new Date(),
        estado: this.userForm.get('estado')?.value!,
      };

      this.userService.addUser(newUser).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
        },
        error: (error) => {
          console.error('Error al registrar el usuario:', error);
        },
      });
    }
  }

  togglePasswordVisibility() {
    this.hide.set(!this.hide());
  }
}
