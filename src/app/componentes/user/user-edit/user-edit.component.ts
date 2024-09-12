import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../interfaces/role'; // Asegúrate de importar la interfaz Role

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatSelectModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  userId!: number;
  hidePassword = true;
  roles: Role[] = [
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Vendedor' },
    // Añadir otros roles según sea necesario
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(5)]],
      role: [null, Validators.required], // Asegúrate de que `role` esté como objeto Role
      estado: [true],
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  if (this.userId) {
    this.userService.getUserById(this.userId).subscribe(
      (user) => {
        console.log('Fetched user:', user); // Verifica los datos recibidos
        
        // Encuentra el rol del usuario actual en el array de roles
        const userRole = this.roles.find(role => role.id === user.role.id);
        
        // Establece los valores en el formulario
        this.userForm.patchValue({
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          contraseña: user.contraseña,
          role: userRole || null, // Usa el objeto Role completo
          estado: user.estado,
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching user:', error);
      }
    );
  }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValues = this.userForm.value;
      const updatedUser = {
        id: this.userId,
        nombre: formValues.nombre,
        apellido: formValues.apellido,
        correo: formValues.correo,
        contraseña: formValues.contraseña,
        role: { id: formValues.role.id, name: formValues.role.name }, // Asegúrate de enviar el objeto role
        fecha_creacion: new Date(), 
        estado: formValues.estado,
      };
  
      this.userService.updateUser(this.userId, updatedUser).subscribe(
        () => {
          this.router.navigate(['/user/index']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}