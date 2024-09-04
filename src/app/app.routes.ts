import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { UserAddComponent } from './componentes/user/user-add/user-add.component';
import { UserIndexComponent } from './componentes/user/user-index/user-index.component';
import { UserEditComponent } from './componentes/user/user-edit/user-edit.component';
import { SuppliersIndexComponent } from './componentes/suppliers/suppliers-index/suppliers-index.component';
import { SuppliersAddComponent } from './componentes/suppliers/suppliers-add/suppliers-add.component';
import { ClientsIndexComponent } from './componentes/clients/clients-index/clients-index.component';
import { ClientsAddComponent } from './componentes/clients/clients-add/clients-add.component';
import { ClientsEditComponent } from './componentes/clients/clients-edit/clients-edit.component';
import { SuppliersEditComponent } from './componentes/suppliers/suppliers-edit/suppliers-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'user/index',
    component: UserIndexComponent,
    title: 'Indice de Usuarios',
  },
  {
    path: 'user/add',
    component: UserAddComponent,
    title: 'Registrar Usuario',
  },
  {
    path: 'user/edit',
    component: UserEditComponent,
    title: 'Editar Usuario',
  },
  {
    path: 'suppliers/index',
    component: SuppliersIndexComponent,
    title: 'Indice de Proveedores',
  },
  {
    path: 'suppliers/add',
    component: SuppliersAddComponent,
    title: 'Registrar Usuario',
  },
  {
    path: 'suppliers/edit',
    component: SuppliersEditComponent,
    title: 'Editar Proveedor',
  },
  {
    path: 'clients/index',
    component:ClientsIndexComponent,
    title:'Indice de clientes',
  },
  {
    path: 'clients/add',
    component: ClientsAddComponent,
    title: 'Registrar cliente',
  },
  {
    path: 'clients/edit',
    component: ClientsEditComponent,
    title: 'Editar cliente',
  },
];
