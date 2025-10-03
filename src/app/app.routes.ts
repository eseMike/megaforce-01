import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { QuienessomosComponent } from './pages/quienessomos/quienessomos.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'quienessomos', component: QuienessomosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: '**', redirectTo: '' }
];

export const appRouting = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'top'
});
