import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorAltaComponent } from '../actor-alta/actor-alta.component';
import { ActorListadoComponent } from '../actor-listado/actor-listado.component';

const routes: Routes = [
	{ path: 'listado', component: ActorListadoComponent },
	{ path: 'alta', component: ActorAltaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActoresRoutingModule { }
