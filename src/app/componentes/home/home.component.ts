import { Component } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
=======
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
>>>>>>> b929d0a28f5de52d9ec8d09633eebe60f4a2a158

@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< HEAD
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  dashboardItems = [
    { label: 'Productos', icon: 'inventory', link: '/productos' },
    { label: 'Facturas', icon: 'receipt', link: '/facturas' },
    { label: 'Proveedores', icon: 'business', link: '/proveedores' },
    { label: 'Clientes', icon: 'people', link: '/clientes' },
    { label: 'Usuarios', icon: 'account_circle', link: '/usuarios' },
  ];

  constructor(private router: Router) {}

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }
}
=======
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

>>>>>>> b929d0a28f5de52d9ec8d09633eebe60f4a2a158

