import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { UserAddComponent } from './componentes/user/user-add/user-add.component';
import { UserIndexComponent } from './componentes/user/user-index/user-index.component';
import { UserEditComponent } from './componentes/user/user-edit/user-edit.component';
import { SuppliersIndexComponent } from './componentes/suppliers/suppliers-index/suppliers-index.component';
import { SuppliersAddComponent } from './componentes/suppliers/suppliers-add/suppliers-add.component';
import { ProductsAddComponent } from './componentes/products/products-add/products-add.component';
import { ProductsIndexComponent } from './componentes/products/products-index/products-index.component';
import { CategoriesAddComponent } from './componentes/categories/categories-add/categories-add.component';
import { CategoriesIndexComponent } from './componentes/categories/categories-index/categories-index.component';
import { ProductsEditComponent } from './componentes/products/products-edit/products-edit.component';
import { CategoriesEditComponent } from './componentes/categories/categories-edit/categories-edit.component';
import { SuppliersEditComponent } from './componentes/suppliers/suppliers-edit/suppliers-edit.component';
import { ClientsIndexComponent } from './componentes/clients/clients-index/clients-index.component';
import { ClientsAddComponent } from './componentes/clients/clients-add/clients-add.component';
import { ClientsEditComponent } from './componentes/clients/clients-edit/clients-edit.component';
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
    path: 'user/edit/:id',
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
    path: 'suppliers/edit/:id',
    component: SuppliersEditComponent,
    title: 'Editar Proveedor',
  },

  {
    path: 'products/index',
    component: ProductsIndexComponent,
    title: 'Indice de productos',
  },

  {
    path: 'products/add',
    component: ProductsAddComponent,
    title: 'Registrar Producto',
  },
  {
    path: 'products/edit/:id',
    component: ProductsEditComponent,
    title: 'Editar producto',
  },
  {
    path: 'categories/index',
    component: CategoriesIndexComponent,
    title: 'Indice de categorias',
  },
  {
    path: 'categories/add',
    component: CategoriesAddComponent,
    title: 'Registrar categoria',
  },
  {
    path: 'categories/edit/:id',
    component: CategoriesEditComponent,
    title: 'Editar categoria',
  },

  {
    path: 'clients/index',
    component: ClientsIndexComponent,
    title: 'Indice de clientes',
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
