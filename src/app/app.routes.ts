import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { UserAddComponent } from './componentes/user/user-add/user-add.component';
import { UserIndexComponent } from './componentes/user/user-index/user-index.component';
import { UserEditComponent } from './componentes/user/user-edit/user-edit.component';
import { SuppliersIndexComponent } from './componentes/suppliers/suppliers-index/suppliers-index.component';
import { SuppliersAddComponent } from './componentes/suppliers/suppliers-add/suppliers-add.component';
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
    path: 'suppliers/index',
    component: SuppliersIndexComponent,
    title: 'Indice de Proveedores',
  },
  {
    path: 'suppliers/add',
    component: SuppliersAddComponent,
    title: 'Registrar Usuario',
  },
];
