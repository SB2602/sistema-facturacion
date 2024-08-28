import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
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

