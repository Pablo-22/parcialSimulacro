import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './vistas/busqueda/busqueda.component';
import { HomeComponent } from './vistas/home/home.component';

const routes: Routes = [
	
	{ path: 'busqueda', component: BusquedaComponent },
	{ path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
