import { ClientesComponent } from './src/app/pages/clientes/clientes';
import { ComprasComponent } from './src/app/pages/compras/compras';
import { ArticulosComponent } from './src/app/pages/articulos/articulos';
import { Routes } from '@angular/router';
import { TiendasComponent } from './src/app/pages/tiendas/tiendas';
import { LoginComponent } from './src/app/pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'tiendas', component: TiendasComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: '**', redirectTo: 'login' }
];
